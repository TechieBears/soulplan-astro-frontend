import { DocumentUpload, TickCircle, Eye } from "iconsax-reactjs";
import Error from "../Errors/Error";
import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { uploadToCloudinary } from "../../api";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageView from "../Modals/ImageView/ImageView";

const ImageCropUpload = ({
  label,
  errors,
  register,
  registerName,
  setValue,
  defaultValue,
  style,
  disabled,
  cropAspectRatio = 5 / 3, // rectangular shape
  cropWidth = 500,
  cropHeight = 300,
}) => {
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [crop, setCrop] = useState({
    unit: "px",
    width: cropWidth,
    height: cropHeight,
    x: 50,
    y: 50,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  // Load existing image (edit mode)
  useEffect(() => {
    if (defaultValue) {
      const dummyFile = {
        name: defaultValue.split("/").pop(),
        url: defaultValue,
      };
      setFiles([dummyFile]);
      setFileName(dummyFile.name);
      setValue(registerName, defaultValue);
    }
  }, [defaultValue, registerName, setValue]);

  const handleFileChange = (e) => {
    if (e?.target?.files?.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage({
          file,
          src: reader.result,
          name: file.name,
        });
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = useCallback(
    (e) => {
      const { width, height } = e.currentTarget;
      const centerX = Math.max(0, (width - cropWidth) / 2);
      const centerY = Math.max(0, (height - cropHeight) / 2);
      setCrop({
        unit: "px",
        width: cropWidth,
        height: cropHeight,
        x: centerX,
        y: centerY,
      });
    },
    [cropWidth, cropHeight]
  );

  const getCroppedImg = useCallback((image, crop) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!crop || !canvas || !ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.9);
    });
  }, []);

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsUploading(true);
    try {
      const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
      const croppedFile = new File([croppedBlob], selectedImage.name, {
        type: "image/jpeg",
      });

      const url = await uploadToCloudinary(croppedFile);
      setValue(registerName, url);

      const previewFile = {
        file: croppedFile,
        name: selectedImage.name,
        url: url,
      };

      setFiles([previewFile]);
      setFileName(selectedImage.name);
      setShowCropModal(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setSelectedImage(null);
    setCrop({ x: 0, y: 0, width: cropWidth, height: cropHeight });
    setCompletedCrop(null);
  };

  return (
    <>
      <div
        className={`h-[53px] relative flex rounded-lg w-full cursor-pointer bg-slate1 ${style}`}
      >
        <input
          type="file"
          id={registerName}
          accept="image/*"
          className={`peer w-full bg-transparent outline-none px-4 text-base font-tbLex text-black rounded-lg bg-slate1 ${style}
            ${
              !errors?.ref?.value && errors?.type === "required"
                ? "border-red-500"
                : "border-slate-300 focus:border-primary"
            }
            opacity-0 absolute z-10 cursor-pointer ${style}`}
          onChange={handleFileChange}
          disabled={isUploading || disabled}
        />
        <div
          className={`w-full h-full flex items-center px-4 rounded-lg cursor-pointer
          ${
            !errors?.ref?.value && errors?.type === "required"
              ? "border-red-500"
              : "border-slate-300 peer-focus:border-primary"
          } ${style}`}
        >
          <label
            htmlFor={registerName}
            className={`px-2 bg-slate1 text-base font-tbLex ${style}
              ${
                !errors?.ref?.value && errors?.type === "required"
                  ? "text-red-500"
                  : fileName
                  ? "text-primary"
                  : "text-slate-400"
              }
              ${fileName ? "top-0 left-3 text-sm" : ""} transition-all duration-150 flex items-center gap-2 cursor-pointer overflow-hidden`}
          >
            {!fileName && <span><DocumentUpload size="22" /></span>}
            <span className="truncate w-full overflow-hidden">
              {isUploading ? "Uploading..." : fileName || label}
            </span>
          </label>
          <div
            className={`ml-auto flex items-center gap-2 z-50 absolute right-2 bg-slate1 pl-3 cursor-pointer ${style}`}
          >
            {fileName && !isUploading && (
              <span className="text-sm text-green-500 text-nowrap flex items-center">
                <TickCircle size="22" variant="Bold" />
              </span>
            )}
            {files.length > 0 && !isUploading && (
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="text-slate-500 cursor-pointer hover:text-primary transition-colors"
              >
                <Eye size="22" />
              </button>
            )}
          </div>
        </div>
      </div>

      {!errors?.ref?.value && errors?.type === "required" && (
        <Error
          message={`${label.replace(/\b(enter|your)\b/gi, "").trim()} is required`}
        />
      )}

      {/* Crop Modal */}
      <Transition appear show={showCropModal} as={Fragment}>
        <Dialog as="div" className="relative z-[1001]" onClose={handleCropCancel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-[2.3px] bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white bg-linear-gradient py-4 px-6 relative"
                  >
                    Crop Your Image
                    <button
                      onClick={handleCropCancel}
                      className="absolute right-4 top-4 text-white hover:text-gray-200"
                    >
                      <X size={24} />
                    </button>
                  </Dialog.Title>

                  <div className="p-6">
                    <div className="flex justify-center">
                      {selectedImage && (
                        <ReactCrop
                          crop={crop}
                          onChange={(newCrop) => setCrop(newCrop)}
                          onComplete={(c) => setCompletedCrop(c)}
                          aspect={cropAspectRatio}
                          locked={true} // ✅ Prevent resizing
                          className="max-w-full"
                          ruleOfThirds={false}
                        >
                          <img
                            ref={imgRef}
                            src={selectedImage.src}
                            alt="Crop preview"
                            className="max-w-full max-h-96 object-contain"
                            onLoad={onImageLoad}
                          />
                        </ReactCrop>
                      )}
                    </div>

                    <div className="mt-4 text-sm text-gray-600 text-center">
                      <p>Move the crop area to adjust position.</p>
                      <p>Fixed rectangular ratio: {cropWidth}×{cropHeight}px (4:3)</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCropCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleCropComplete}
                      disabled={isUploading}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                      {isUploading ? "Uploading..." : "Crop & Upload"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ImageView
        isOpen={showImageModal}
        toggle={() => setShowImageModal(false)}
        files={files}
      />


      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
};

export default ImageCropUpload;
