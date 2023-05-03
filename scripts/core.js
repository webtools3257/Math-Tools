const base_link = "https://webtools3257.github.io"
import(base_link+"/scripts/components/navbar.js")

const mj = function(tex) {
	return MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
}

function displayMathExpression(element, expression) {
	try {
		let node = math.parse(expression)
		const latex = node ? node.toTex({ parenthesis: "auto", implicit: false }) : ''
		MathJax.typesetClear();
		element.innerHTML = '';
		element.appendChild(mj(latex));
	}
	catch (err) {}
}

