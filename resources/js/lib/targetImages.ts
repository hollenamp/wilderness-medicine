/**
 * Target progress images by percentage range.
 * Images are served from /target/XX/ where XX is the folder key (00, 01, 10, ..., 100).
 * The actual image map is managed via the admin Target GIFs page and fetched from
 * /target-images.json — this file only handles the threshold math and caching.
 */

export type TargetImageMap = Record<string, string[]>;

let cachedImages: TargetImageMap | null = null;
let pendingFetch: Promise<TargetImageMap> | null = null;

/**
 * Fetches the threshold -> image paths map, caching the result for subsequent calls.
 */
export function fetchTargetImages(): Promise<TargetImageMap> {
    if (cachedImages) {
        return Promise.resolve(cachedImages);
    }

    if (!pendingFetch) {
        pendingFetch = fetch('/target-images.json')
            .then((response) => response.json())
            .then((data: TargetImageMap) => {
                cachedImages = data;
                return data;
            })
            .finally(() => {
                pendingFetch = null;
            });
    }

    return pendingFetch;
}

/**
 * Maps progress percentage to target folder key.
 * 0 -> "00" | 1-9 -> "01" | 10-19 -> "10" | ... | 90-99 -> "90" | 100 -> "100"
 */
export function getTargetFolder(progressPercentage: number): string {
    if (progressPercentage <= 0) return "00";
    if (progressPercentage >= 100) return "100";

    const tens = Math.floor(progressPercentage / 10);
    if (tens === 0) return "01"; // 1-9
    return String(tens * 10).padStart(2, "0"); // 10 -> "10", 20 -> "20", etc.
}

/**
 * Returns a random image URL for the given progress percentage, using the
 * provided image map (from fetchTargetImages()). Picks randomly when the
 * folder contains multiple images.
 */
export function getRandomTargetImage(progressPercentage: number, images: TargetImageMap): string {
    const folder = getTargetFolder(progressPercentage);
    const candidates = images[folder];
    if (!candidates || candidates.length === 0) return "";
    return candidates[Math.floor(Math.random() * candidates.length)];
}
