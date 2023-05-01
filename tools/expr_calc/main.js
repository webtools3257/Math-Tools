const expr = document.getElementById('expr')
const pretty = document.getElementById('pretty')
const result = document.getElementById('result')
let parenthesis = 'keep'
let implicit = 'hide'

const mj = function(tex) {
	return MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
}

expr.style.boxShadow = "none"
expr.style.borderWidth = "1px"

function calc() {
	try {
		let e = nerdamer(expr.value);
		let latex = nerdamer.convertToLaTeX(expr.value)
		let res_val = nerdamer.convertToLaTeX(e.evaluate().toString())
		MathJax.typesetClear();

		expr.style.borderColor = "var(--success-color)"
		pretty.innerHTML = '';
		pretty.appendChild(mj(latex));
		result.innerHTML = '';
		result.appendChild(mj(res_val));
	}
	catch (err) {
		expr.style.borderColor = "red"
		pretty.innerHTML = '#Error';
		result.innerHTML = '#Error';
	}

}
expr.oninput = function() {
	pretty.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	result.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;

	calc()
}