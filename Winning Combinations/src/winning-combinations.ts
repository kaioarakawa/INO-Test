type WinningCombinationsResult = [number, number[]][];

// Function to determine winning combinations
function call(lines: number[]): WinningCombinationsResult {
  const wild = 0;
  const paySymbols = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const nonPaySymbols = new Set([10, 11, 12, 13, 14, 15]);

  let results: WinningCombinationsResult = [];
  let i = 0;

  while (i < lines.length) {
    let start = i;
    let symbol = lines[i];
    if (paySymbols.has(symbol) 
        || symbol === wild) {
      let end = start;
      let countWild = symbol === wild ? 1 : 0;
      let jump = end === 0 ? 1 : end;

      while (end + 1 < lines.length
        && (lines[end + 1] === symbol
          || lines[end + 1] === wild
          || (symbol === wild && paySymbols.has(lines[end + 1])))) {
        
        if (lines[end + 1] === wild) {
          countWild++;
        }

        if(lines[end + 1] === wild && countWild == 1){
          jump = end;
        }

        if (symbol === wild && paySymbols.has(lines[end + 1])) {
          symbol = lines[end + 1];
        }
        end++;

        if(end + 1 === lines.length)
          jump = end;
      }

      if (end - start + 1 >= 3) {
        results.push([symbol, Array.from({ length: end - start + 1 }, (_, idx) => start + idx)]);
      }
      
      if(countWild > 0){
        i = jump + 1;
        // console.log(i)
      }
      else 
        i = end + 1;
        
    } else {
      i++;
    }
  }

  return results;
}
export const WinningCombinations = { call };