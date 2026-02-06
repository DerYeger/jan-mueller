export const CLASSES = {
  CHECKBOX: `appearance-none rounded-sm bg-base transition-colors checked:bg-blue-500 checked:border-blue-600 border border-medium size-4 disabled:bg-disabled relative checked:before:content-['✓'] checked:before:absolute
         checked:before:inset-0 checked:before:flex
         checked:before:items-center checked:before:justify-center
         checked:before:text-white checked:before:text-sm
         checked:before:font-bold focus-visible:focus-ring`,
  INPUT: 'select-none grow bg-base rounded-sm border border-medium px-2 py-1 text-base disabled:bg-disabled disabled:text-lighter transition-colors focus-visible:focus-ring'
} as const
