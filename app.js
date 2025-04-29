function togglePassword() {
    const pwdInput = document.getElementById("pwd");
    const checkbox = document.getElementById("check");
    if (checkbox.checked) {
      pwdInput.type = "text";
    } else {
      pwdInput.type = "password";
    }
}

function charEntropy(pass) {
  const uniqueChars = new Set(pass).size;
  const baseCharset = charsize(pass);
  return uniqueChars * Math.log2(baseCharset);
}

function entropy(){
  const pass = document.getElementById("pwd").value
  const metric = document.getElementById("Strength")
  const inpu = document.getElementById("pwd")
  if(pass===""){
    metric.innerText = "No Password"
    metric.style.backgroundColor = "gray"
    return;
  }
  let ans = charEntropy(pass)
  if(ans<=40){
    metric.innerText="Very Weak"
    metric.style.backgroundColor = 'Red'
  }
  if(ans>40 && ans<=60){
    metric.innerText="Moderate"
    metric.style.backgroundColor = "yellow"

  }
  if(ans>60 && ans<=80){
    metric.innerText="Strong"
    metric.style.backgroundColor = "lightgreen"

  }
  if(ans>80){
    metric.innerText="Very Strong"
    metric.style.backgroundColor="Green"
  }
}

function charsize(inp){

  let charset=0
  const haslower = /[a-z]/.test(inp)
  const hasupper = /[A-Z]/.test(inp)
  const isdigit = /[\d]/.test(inp)
  const issymbol = /[^A-Za-z0-9]/.test(inp)
  if(hasupper) charset+=26
  if(haslower) charset+=26
  if(isdigit) charset+=10
  if(issymbol) charset+=32
  return charset

} 

function timeformat(seconds){
  const tim=seconds
  if(tim<60) return `${tim.toFixed(2)} Seconds`
  if(tim<3600) return `${(tim/60).toFixed(2)} minutes`
  if(tim<86400) return `${(tim/3600).toFixed(2)} Hours`
  if(tim<31536000) return `${(tim/86400).toFixed(2)} Days`
  else return `${(tim/31536000).toFixed(2)} Years`
}

function bruteforce() {
  const val = document.getElementById("pwd").value;
  const chars = charsize(val);

  if (chars === 0 || val === "") {
    document.getElementById("time-taken").innerText = "0.0 Seconds";
    return;
  }

  const entropy = charEntropy(val);
  const guesses = BigInt(Math.floor(Math.pow(2, entropy)));
  const big = BigInt(1e9); 
  const seconds = guesses / big;

  document.getElementById("time-taken").innerText = timeformat(Number(seconds));
}

function countDictionaryWords(password) {
  const cleaned = password.toLowerCase().replace(/[^a-z]/g, ''); // remove non-letters
  const n = cleaned.length;
  let count = 0;
  const foundWords = new Set();

  for (let i = 0; i < n; i++) {
    for (let j = i + 5; j <= n; j++) { 
      const word = cleaned.slice(i, j);
      if (wordSet.has(word) && !foundWords.has(word)) {
        foundWords.add(word);
        count++;
      }
    }
  }

  return count;
}

function updateDictCount() {
  const pass = document.getElementById("pwd").value;
  const count = countDictionaryWords(pass);
  if (pass === "") {
    document.getElementById("dict").innerText = "";
    return;
}
  const dictMsg = document.getElementById("dict");
  if (count > 0) {
    dictMsg.innerText = `⚠️ Avoid using ${count} dictionary word(s) to prevent dictionary attacks`;
  } 
}




