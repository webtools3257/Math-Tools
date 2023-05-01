const expr = document.getElementById('expr')
const variable = document.getElementById('variable')
const degree = document.getElementById('degree')
const pretty = document.getElementById('pretty')
const result = document.getElementById('result')
let parenthesis = 'keep'
let implicit = 'hide'

const mj = function(tex) {
	return MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
}

expr.style.boxShadow = "none"
expr.style.borderWidth = "1px"

function calc(){
	try{
	let expr_ = `diff(${expr.value},${variable.value}`+(degree.value =="1"?" ":","+degree.value)+")"
	let e = nerdamer(expr_);
	let latex = nerdamer.convertToLaTeX(expr_)
	let res_val = nerdamer.convertToLaTeX(e.evaluate().toString())
	MathJax.typesetClear();
	expr.style.borderColor = "var(--success-color)"
	pretty.innerHTML = '';
	pretty.appendChild(mj(latex));
	result.innerHTML = '';
	result.appendChild(mj(res_val));
	}catch(e){
		pretty.innerHTML = '#Error';
		result.innerHTML = '#Error';
	}
}

expr.oninput = function() {
	pretty.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	result.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	calc()
}

variable.oninput = function() {
	pretty.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	result.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	calc()
}

degree.oninput = function() {
	pretty.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	result.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	calc()
}