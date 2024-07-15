type WinningCombinationsResult = [number, number[]][];

// Constants for symbols
//I created this global const because the intention is to bring a recursive code
// with functions accessing this const without having to pass through a parameter
const wild = 0;
const paySymbols = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//needed? maybe in one task for map some rule but in this case i dont see any use for this
//but i prefer to stay with this code to new fetures
const nonPaySymbols = new Set([10, 11, 12, 13, 14, 15]);

function findEndAndJump(
  lines: number[],
  end: number,
  symbol: number,
  countWild: number,
  jump: number
): { end: number, jump: number, countWild: number, symbol: number } {
  //validates whether recursion can be terminated based on some rules
  // if it is at the end
  // or if the next n is a paid symbol
  if (end + 1 >= lines.length 
      || !(lines[end + 1] === symbol
        || lines[end + 1] === wild
        || (symbol === wild && paySymbols.has(lines[end + 1])))) {
    
    //if at some point we reach the last index within
    //of this function means we need to skip to the end
    if (end + 1 === lines.length)
      jump = end;

    return { end, jump, countWild, symbol };
  }

  //specific case to get the symbol if the one that came first is wild
  if (symbol === wild && paySymbols.has(lines[end + 1])) 
    symbol = lines[end + 1];

  //count wild and set jump when wild found first
  
  if (lines[end + 1] === wild){
    countWild++;

    // we will do that because if found a wild he can usefull for other sequence, so we need to count
    if(countWild === 1)
      jump = end;
  }
  
  end++;

  return findEndAndJump(lines, end, symbol, countWild, jump);
}

function processLines(
  lines: number[],
  i: number,
  results: WinningCombinationsResult
): void {
  //validation to see if the index is greater than the size of the array, 
  //this helps us to stop recursion as well as finalize the source if n has a value
  if (i >= lines.length) {
    return;
  }

  //set the start index to save where is the first symbol of combination
  let start = i;
  //set the actual symbol
  let symbol = lines[i];

  //validate if the symbol is a paySymbol
  // rigth here if is a pay symbol we can pass and if not we dont need to do nothing 
  //so validate the nonPay symbol is not required
  if (paySymbols.has(symbol) 
      || (symbol === wild )) {
    
    //end is the variable to set the index o end combination, so this is change
    let end = start;
    //countWild is a count to validate if we found some wild and in future we can put some max wild to use
    let countWild = symbol === wild ? 1 : 0;
    //jump we will set 1 because we need to see how a array works, index 0 is on slot so we need to put this slot (1)
    let jump = end === 0 ? 1 : end;

    const { end: finalEnd, jump: finalJump, countWild: finalCountWild, symbol: finalSymbol } = findEndAndJump(lines, end, symbol, countWild, jump);
    
    //set the combination if we found the 3 or more
    if (finalEnd - start + 1 >= 3) {
      results.push([finalSymbol, Array.from({ length: finalEnd - start + 1 }, (_, idx) => start + idx)]);
    }

    //recurse call for function 
    if (finalCountWild > 0) {
      processLines(lines, finalJump + 1, results);
    } else {
      processLines(lines, finalEnd + 1, results);
    }
  } else {
    processLines(lines, i + 1, results);
  }
}

// Main function to determine winning combinations
function call(lines: number[]): WinningCombinationsResult {
  let results: WinningCombinationsResult = [];
  processLines(lines, 0, results);
  return results;
}

export const WinningCombinations = { call };
