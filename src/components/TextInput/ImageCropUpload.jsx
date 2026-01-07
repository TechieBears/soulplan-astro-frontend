import { DocumentUpload, TickCircle, Eye } from "iconsax-reactjs";
import Error from "../Errors/Error";
import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageView from "../Modals/ImageView/ImageView";

const ImageCropUpload = ({
  label,
  errors,
  multiple,
  registerName,
  setValue,
  defaultValue,
  style,
  disabled,
  cropAspectRatio = 5 / 3,
  cropWidth = 500,
  cropHeight = 300,
  showRemoveOption = false,
  outputWidth,
  outputHeight,
}) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [crop, setCrop] = useState(undefined);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [pendingFiles, setPendingFiles] = useState([]);

  useEffect(() => {
    if (defaultValue) {
      if (multiple && Array.isArray(defaultValue)) {
        const dummyFiles = defaultValue.map((url) => ({
          name: url.split("/").pop(),
          url,
          value: url
        }));
        setFiles(dummyFiles);
        setValue(registerName, defaultValue);
      } else if (!multiple && typeof defaultValue === "string") {
        const dummyFile = {
          name: defaultValue.split("/").pop(),
          url: defaultValue,
          value: defaultValue
        };
        setFiles([dummyFile]);
        setValue(registerName, defaultValue);
      }
    }
  }, [defaultValue, registerName, setValue, multiple]);

  const handleFileChange = (e) => {
    if (e?.target?.files?.length > 0) {
      if (multiple) {
        const fileArray = Array.from(e.target.files);
        setPendingFiles(fileArray);
        // Open first file for cropping
        const reader = new FileReader();
        const first = fileArray[0];
        reader.onload = () => {
          setSelectedImage({ file: first, src: reader.result, name: first.name });
          setShowCropModal(true);
        };
        reader.readAsDataURL(first);
      } else {
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
    }
  };

  const onImageLoad = useCallback(
    (e) => {
      const { width, height } = e.currentTarget;
      let desiredW = width;
      let desiredH = height;
      if (cropAspectRatio) {
        const imageAspect = width / height;
        if (imageAspect >= cropAspectRatio) {
          desiredH = height;
          desiredW = height * cropAspectRatio;
        } else {
          desiredW = width;
          desiredH = width / cropAspectRatio;
        }
      } else {
        desiredW = width;
        desiredH = height;
      }
      const centerX = Math.max(0, (width - desiredW) / 2);
      const centerY = Math.max(0, (height - desiredH) / 2);
      const initialCrop = {
        unit: "%",
        width: (desiredW / width) * 100,
        height: (desiredH / height) * 100,
        x: (centerX / width) * 100,
        y: (centerY / height) * 100,
      };
      setCrop(initialCrop);
    },
    [cropWidth, cropHeight, cropAspectRatio]
  );

  const getCroppedImg = useCallback(
    (image, crop) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!crop || !canvas || !ctx) return;

      // Convert crop to pixel units if provided in percentage
      const cropX = crop.unit === "%" ? (crop.x / 100) * image.width : crop.x;
      const cropY = crop.unit === "%" ? (crop.y / 100) * image.height : crop.y;
      const cropW = crop.unit === "%" ? (crop.width / 100) * image.width : crop.width;
      const cropH = crop.unit === "%" ? (crop.height / 100) * image.height : crop.height;

      const targetW = outputWidth || Math.round(cropW);
      const targetH = outputHeight || Math.round(cropH);
      const pixelRatio = window.devicePixelRatio;
      canvas.width = targetW * pixelRatio;
      canvas.height = targetH * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      ctx.drawImage(
        image,
        cropX * scaleX,
        cropY * scaleY,
        cropW * scaleX,
        cropH * scaleY,
        0,
        0,
        targetW,
        targetH
      );

      return new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.9);
      });
    },
    [outputWidth, outputHeight]
  );

  const handleCropComplete = async () => {
    const cropToUse = crop;
    if (!cropToUse || !imgRef.current) return;

    setIsUploading(true);
    try {
      const croppedBlob = await getCroppedImg(imgRef.current, cropToUse);
      const croppedFile = new File([croppedBlob], selectedImage.name, {
        type: "image/jpeg",
      });

      let formValue;
      let displayUrl;

      // Always return binary File object and create blob URL for preview
      formValue = croppedFile;
      displayUrl = URL.createObjectURL(croppedFile);

      const previewFile = {
        file: croppedFile,
        name: selectedImage.name,
        url: displayUrl,
        value: formValue
      };

      if (multiple) {
        const newFiles = [...files, previewFile];
        setFiles(newFiles);
        setValue(
          registerName,
          newFiles.map((f) => f.value)
        );
        // Proceed to next pending file if any
        if (pendingFiles.length > 0) {
          const remaining = pendingFiles.slice(1);
          setPendingFiles(remaining);
          if (remaining.length > 0) {
            const next = remaining[0];
            const reader = new FileReader();
            reader.onload = () => {
              setSelectedImage({ file: next, src: reader.result, name: next.name });
              // keep modal open for next
            };
            reader.readAsDataURL(next);
          } else {
            setShowCropModal(false);
            setSelectedImage(null);
          }
        } else {
          setShowCropModal(false);
          setSelectedImage(null);
        }
      } else {
        setFiles([previewFile]);
        setValue(registerName, formValue);
        setShowCropModal(false);
        setSelectedImage(null);
      }

      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      console.error("Upload/Processing failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setSelectedImage(null);
    setCrop(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    if (updatedFiles.length === 0) {
      setValue(registerName, multiple ? [] : "");
    } else {
      setValue(registerName, multiple ? updatedFiles.map(f => f.value) : updatedFiles[0].value);
    }
  };

  const isError = !errors?.ref?.value && errors?.type === "required";
  const fileName = files.length === 0
    ? ""
    : multiple
      ? `${files.length} files selected`
      : files[0]?.name || "";

  return (
    <>
      <div
        className={`h-[53px] relative flex rounded-lg w-full cursor-pointer bg-slate1 ${style}`}
      >
        <input
          type="file"
          id={registerName}
          accept="image/*"
          multiple={multiple}
          ref={inputRef}
          className={`peer w-full bg-transparent outline-none px-4 text-base font-tbLex text-black rounded-lg bg-slate1 ${style}
            ${isError ? "border-red-500" : "border-slate-300 focus:border-primary"}
            opacity-0 absolute z-10 cursor-pointer ${style}`}
          onChange={handleFileChange}
          disabled={isUploading || disabled}
        />
        <div
          className={`w-full h-full flex items-center px-4 rounded-lg cursor-pointer
          ${isError ? "border-red-500" : "border-slate-300 peer-focus:border-primary"} ${style}`}
        >
          <label
            htmlFor={registerName}
            className={`px-2 bg-slate1 text-base font-tbLex ${style}
              ${isError ? "text-red-500" : fileName ? "text-primary" : "text-slate-400"}
              ${fileName ? "top-0 left-3 text-sm" : ""
              } transition-all duration-150 flex items-center gap-2 cursor-pointer overflow-hidden`}
          >
            {!fileName && (
              <span>
                <DocumentUpload size="22" />
              </span>
            )}
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

      {isError && (
        <Error
          message={`${label
            .replace(/\b(enter|your)\b/gi, "")
            .trim()} is required`}
        />
      )}

      {/* Display existing images */}
      {files.length > 0 && (
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Current Images:</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {showRemoveOption && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                )}
                <p className="text-xs text-gray-500 mt-1 truncate" title={file.name}>
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Transition appear show={showCropModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[1000]"
          onClose={handleCropCancel}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 " />
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
                <Dialog.Panel className="w-full max-w-2xl  rounded-lg bg-white text-left align-middle ">
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
                          onChange={(newCrop, percentCrop) => setCrop(percentCrop || newCrop)}
                          onComplete={(c, percentCrop) => {
                            if (percentCrop) setCrop(percentCrop);
                          }}
                          aspect={cropAspectRatio}
                          locked={false}
                          restrictPosition={true}
                          keepSelection={true}
                          minWidth={1}
                          minHeight={1}
                          className="max-w-full"
                          ruleOfThirds={true}
                        >
                          <img
                            ref={imgRef}
                            src={selectedImage.src}
                            alt="Crop preview"
                            className="max-w-full max-h-[70vh] object-contain"
                            onLoad={onImageLoad}
                          />
                        </ReactCrop>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 flex justify-center items-center">
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={handleCropCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleCropComplete}
                        disabled={isUploading}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md"
                      >
                        {isUploading ? "Uploading..." : "Crop & Upload"}
                      </button>
                    </div>
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
