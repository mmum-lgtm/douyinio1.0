// src/components/DouyinInputSection.tsx
// URL input form for the Douyin downloader.
// Same visual style as InputSection.tsx – just adjusted copy and validation.

interface DouyinInputSectionProps {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
  onSubmit: (e: Event) => void;
  onPaste: () => void;
  error: string;
  extractDouyinUrl: (text: string) => string;
  cleanDouyinUrl: (url: string) => string;
  isValidDouyinUrl: (url: string) => boolean;
}

function DouyinInputSection(props: DouyinInputSectionProps) {
  const handleInputChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    props.setUrl(value);
  };

  const handlePasteInInput = (e: Event) => {
    // Allow the paste to complete first, then clean up the URL if needed
    setTimeout(() => {
      const pasted = (e.target as HTMLInputElement).value;
      if (pasted && pasted.includes("douyin")) {
        const extracted = props.extractDouyinUrl(pasted);
        const cleaned = props.cleanDouyinUrl(extracted);
        if (cleaned !== pasted) {
          props.setUrl(cleaned);
        }
      }
    }, 100);
  };

  return (
    <div class="max-w-4xl mx-auto">
      <div class="download-box rounded-2xl">
        <div class="rounded backdrop-blur-md p-2">
          <form
            class="flex flex-col md:flex-row items-stretch md:items-center gap-2"
            onSubmit={props.onSubmit}
          >
            {/* ── URL input ─────────────────────────────────────────────────── */}
            <div class="relative flex-grow rounded bg-white">
              <input
                type="text"
                value={props.url}
                onInput={handleInputChange}
                onPaste={handlePasteInInput}
                placeholder="Paste Douyin video link here (douyin.com or v.douyin.com)"
                class="w-full h-14 border-gray-700 text-zinc-800 rounded-xl px-5 pr-20 focus:outline-none focus:border-transparent transition-all duration-300"
              />

              {/* Paste button inside input */}
              <button
                type="button"
                onClick={props.onPaste}
                class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity flex items-center gap-2 px-4 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 112 2h2a2 2 0 012-2"
                  />
                </svg>
                Paste
              </button>
            </div>

            {/* ── Submit button ─────────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={props.loading}
              class="h-14 px-8 bg-blue-600 disabled:from-gray-500 disabled:to-gray-400 text-white font-medium rounded shadow-lg hover:shadow transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {props.loading ? (
                <>
                  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="none"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  DOWNLOAD
                </>
              )}
            </button>
          </form>
        </div>

        {/* Helper text */}
        <div class="text-base text-white/70 mt-1 px-2">
          <p>Supports douyin.com and short v.douyin.com links</p>
        </div>
      </div>

      {/* Error display */}
      {props.error && (
        <div class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div class="flex items-center gap-2">
            <svg
              class="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <strong>Error:</strong>
          </div>
          <p class="mt-1">{props.error}</p>
        </div>
      )}
    </div>
  );
}

export default DouyinInputSection;
