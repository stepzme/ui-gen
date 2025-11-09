import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icon } from "@/components/ui/icon"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto"
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full"
  fallback?: React.ReactNode
  loading?: "lazy" | "eager"
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onImageChange?: (src: string) => void
  showControls?: boolean
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ 
    className,
    src,
    alt,
    width,
    height,
    aspectRatio = "auto",
    objectFit = "cover",
    radius = "md",
    fallback,
    loading = "lazy",
    placeholder = "empty",
    blurDataURL,
    onImageChange,
    showControls = false,
    style,
    ...props 
  }, ref) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState(src)
  const [showUrlInput, setShowUrlInput] = React.useState(false)
  const [urlInput, setUrlInput] = React.useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setImageUrl(src)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImageUrl(result)
        onImageChange?.(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setImageUrl(urlInput.trim())
      onImageChange?.(urlInput.trim())
      setShowUrlInput(false)
      setUrlInput("")
    }
  }

  const handleRemoveImage = () => {
    setImageUrl("")
    onImageChange?.("")
  }

    const aspectRatioClasses = {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      auto: ""
    }

    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full"
    }

    const objectFitClasses = {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down"
    }

    const imageStyle = {
      ...style,
      // Only apply fixed width/height if not using w-full class
      ...(width && !className?.includes('w-full') && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && !className?.includes('h-full') && { height: typeof height === 'number' ? `${height}px` : height }),
    }

    if (hasError && fallback) {
      return (
        <div 
          className={cn(
            "flex items-center justify-center bg-muted text-muted-foreground",
            aspectRatioClasses[aspectRatio],
            radiusClasses[radius],
            className
          )}
          style={imageStyle}
        >
          {fallback}
        </div>
      )
    }

    if (!imageUrl) {
      return (
        <div 
          className={cn(
            "flex flex-col items-center justify-center bg-muted text-muted-foreground border-2 border-dashed border-muted-foreground/25",
            aspectRatioClasses[aspectRatio],
            radiusClasses[radius],
            className
          )}
          style={imageStyle}
        >
          {showControls ? (
            <div className="text-center space-y-2">
              <Icon variant="file_upload" className="h-8 w-8 mx-auto" />
              <p className="text-sm">No image selected</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                semantic="default"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon variant="file_upload" className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                semantic="default"
                  onClick={() => setShowUrlInput(true)}
                >
                  <Icon variant="chain" className="h-4 w-4 mr-2" />
                  URL
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="text-center">
              <Icon variant="file_upload" className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">No image</p>
            </div>
          )}
        </div>
      )
    }

    return (
      <div 
        className={cn(
          "relative overflow-hidden group",
          aspectRatioClasses[aspectRatio],
          radiusClasses[radius],
          className
        )}
        style={imageStyle}
      >
        {isLoading && placeholder === "blur" && blurDataURL && (
          <img
            src={blurDataURL}
            alt=""
            className={cn(
              "absolute inset-0 w-full h-full",
              objectFitClasses[objectFit],
              "blur-sm"
            )}
          />
        )}
        
        {isLoading && placeholder === "empty" && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        <img
          ref={ref}
          src={imageUrl}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            objectFitClasses[objectFit],
            isLoading ? "opacity-0" : "opacity-100"
          )}
          {...props}
        />

        {/* Controls overlay */}
        {showControls && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                semantic="default"
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon variant="file_upload" className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button
                size="sm"
                variant="secondary"
                semantic="default"
                onClick={() => setShowUrlInput(true)}
              >
                <Icon variant="chain" className="h-4 w-4 mr-2" />
                URL
              </Button>
              <Button
                size="sm"
                variant="primary"
                semantic="critical"
                onClick={handleRemoveImage}
              >
                <Icon variant="circle_cross" className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* URL Input Modal */}
        {showUrlInput && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
            <div className="bg-background p-4 rounded-lg w-80 max-w-[90%]">
              <div className="space-y-3">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUrlSubmit()
                    if (e.key === 'Escape') setShowUrlInput(false)
                  }}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="secondary"
                semantic="default"
                    onClick={() => setShowUrlInput(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUrlSubmit}
                    disabled={!urlInput.trim()}
                  >
                    Load Image
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

Image.displayName = "Image"

export { Image }
