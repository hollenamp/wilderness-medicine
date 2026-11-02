import React from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { tv, type VariantProps } from "tailwind-variants"

import { cx } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/UI/Dialog"
import { Button } from "./Button"

const galleryVariants = tv({
  base: ["grid w-full", "gap-4 md:gap-8 lg:gap-12"],
  variants: {
    columns: {
      2: "grid-cols-2",
      3: "grid-cols-2 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
})

export interface GalleryItemData {
  src: string
  alt: string
  caption?: string
  title?: string
}

export interface GalleryImageInput {
  id: number
  url: string
  alt_text?: string | null
  title?: string | null
  category_ids?: number[]
}

interface GalleryProps
  extends VariantProps<typeof galleryVariants>,
    React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode
  /** When provided, renders gallery items from this array instead of children */
  images?: GalleryImageInput[]
  itemsPerPage?: number
  page?: number
  onPageChange?: (page: number) => void
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

const Gallery = React.forwardRef<HTMLDivElement, GalleryProps>(
  (
    {
      className,
      columns = 3,
      children,
      images: imagesProp,
      itemsPerPage: itemsPerPageProp,
      page: controlledPage,
      onPageChange,
      ...props
    },
    forwardedRef,
  ) => {
    const [open, setOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [slideDirection, setSlideDirection] = React.useState(0)
    const [internalPage, setInternalPage] = React.useState(1)

    const itemsPerPage = itemsPerPageProp ?? 12
    const isControlled = controlledPage !== undefined
    const currentPage = isControlled ? controlledPage : internalPage
    const setPage = React.useCallback(
      (next: number | ((prev: number) => number)) => {
        const value = typeof next === "function" ? next(currentPage) : next
        if (!isControlled) setInternalPage(value)
        onPageChange?.(value)
      },
      [isControlled, currentPage, onPageChange],
    )

    const itemChildrenFromImages = React.useMemo(() => {
      if (!imagesProp?.length) return []
      return imagesProp.map((img) => (
        <GalleryItem
          key={img.id}
          src={img.url}
          alt={img.alt_text ?? "Gallery image"}
          caption={img.alt_text ?? undefined}
          title={img.title ?? undefined}
        />
      ))
    }, [imagesProp])

    const sourceChildren = imagesProp?.length
      ? itemChildrenFromImages
      : React.Children.toArray(children)

    const itemChildren = sourceChildren.filter(
      (child): child is React.ReactElement<GalleryItemProps> =>
        React.isValidElement(child) &&
        typeof (child.props as GalleryItemProps)?.src === "string" &&
        typeof (child.props as GalleryItemProps)?.alt === "string",
    ) as React.ReactElement<GalleryItemProps>[]
    const totalItems = itemChildren.length
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
    const safePage = Math.min(Math.max(1, currentPage), totalPages)

    const start = (safePage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const pageChildren = itemChildren.slice(start, end)
    const items: GalleryItemData[] = pageChildren.map((child) => ({
      src: child.props.src,
      alt: child.props.alt,
      caption: child.props.caption,
      title: child.props.title,
    }))

    const handleSelect = React.useCallback((index: number) => {
      setSlideDirection(0)
      setSelectedIndex(index)
      setOpen(true)
    }, [])

    const goPrev = React.useCallback(() => {
      setSlideDirection(-1)
      setSelectedIndex((i) => (i <= 0 ? items.length - 1 : i - 1))
    }, [items.length])

    const goNext = React.useCallback(() => {
      setSlideDirection(1)
      setSelectedIndex((i) => (i >= items.length - 1 ? 0 : i + 1))
    }, [items.length])

    const current = items[selectedIndex]

    const goToPage = React.useCallback(
      (pageNum: number) => {
        const clamped = Math.max(1, Math.min(pageNum, totalPages))
        setPage(clamped)
      },
      [totalPages, setPage],
    )

    return (
      <>
        <div
          ref={forwardedRef}
          className={cx("flex flex-col gap-6", className)}
          {...props}
        >
          <motion.div
            className={cx(galleryVariants({ columns }))}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {pageChildren.map((child, index) =>
              React.cloneElement(child, {
                key: `${child.props.src}-${start + index}`,
                index,
                onSelect: () => handleSelect(index),
              }),
            )}
          </motion.div>

          {itemsPerPage < totalItems && (
            <nav
              className="flex flex-wrap items-center justify-center gap-2"
              aria-label="Gallery pagination"
            >
              <Button
                type="button"
                variant="secondaryOutline"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage <= 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" aria-hidden />
                <span className="sr-only sm:inline sm:not-sr-only">Previous</span>
              </Button>
              <span className="flex items-center gap-1 px-2 text-sm text-zinc-600">
                <span aria-live="polite">
                  Page {safePage} of {totalPages}
                </span>
              </span>
              <Button
                type="button"
                variant="secondaryOutline"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage >= totalPages}
                aria-label="Next page"
              >
                <span className="sr-only sm:inline sm:not-sr-only">Next</span>
                <ChevronRight className="size-4" aria-hidden />
              </Button>
            </nav>
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="max-h-[85vh] w-full max-w-5xl overflow-hidden border-0 bg-transparent p-0 shadow-none data-[state=open]:animate-none"
            aria-describedby={undefined}
          >
            <DialogTitle className="sr-only">
              {current ? current.alt : "Image lightbox"}
            </DialogTitle>
            <div className="relative flex min-h-[85vh] w-full flex-col overflow-hidden">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" aria-hidden />
              </button>
              <div className="relative z-[1] flex min-h-[85vh] w-full flex-1 items-center justify-center p-4">
                <AnimatePresence
                  initial={false}
                  mode="wait"
                  custom={slideDirection}
                >
                  {current && (
                    <motion.div
                      key={selectedIndex}
                      custom={slideDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        },
                        opacity: { duration: 0.2 },
                      }}
                      className="absolute inset-0 flex items-center justify-center p-4"
                    >
                      <img
                        src={current.src}
                        alt={current.alt}
                        className="max-h-[85vh] h-auto w-auto object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next image"
              >
                <ChevronRight className="size-6" aria-hidden />
              </button>
              <DialogClose
                className="absolute right-4 top-4 z-10 bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close lightbox"
              >
                <X className="size-6" aria-hidden />
              </DialogClose>
              {current &&
                (current.caption ?? current.alt) && (
                  <p className="relative z-10 flex-shrink-0 bg-black/40 px-4 py-3 text-center text-sm text-white/90">
                    {current.caption ?? current.alt}
                  </p>
                )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  },
)
Gallery.displayName = "Gallery"

interface GalleryItemProps extends GalleryItemData {
  index?: number
  onSelect?: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

const GalleryItem = React.forwardRef<HTMLButtonElement, GalleryItemProps>(
  ({ src, alt, title, onSelect }, forwardedRef) => (
    <motion.figure
      className="m-0 flex flex-col gap-2"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <motion.button
        ref={forwardedRef}
        type="button"
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cx(
          "group block w-full overflow-hidden",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        )}
        aria-label={`View full size: ${alt}`}
      >
        <motion.div
          className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </motion.button>
      {title ? (
        <figcaption className="text-center text-xs font-semibold uppercase tracking-widest text-charcoal-brown-950 md:text-sm">
          {title}
        </figcaption>
      ) : null}
    </motion.figure>
  ),
)
GalleryItem.displayName = "GalleryItem"

export { Gallery, GalleryItem, galleryVariants, type GalleryProps }
