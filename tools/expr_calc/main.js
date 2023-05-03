const expr = document.getElementById('expr')
const result = document.getElementById('result')
let parenthesis = 'keep'
let implicit = 'hide'

expr.style.boxShadow = "none"
expr.style.borderWidth = "1px"

async function calc() {
	try {
		let e = math.simplify(expr.value, {}, { exactFractions: true })
		return e
	}
	catch (err) {
		throw err
	}

}
expr.oninput = function() {
	result.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	calc()
		.then((res) => {
			expr.parentElement.classList.add("form-success")
			expr.parentElement.classList.remove("form-invaild")
			displayMathExpression(result, res.toString())
		})
		.catch((err) => {
			expr.parentElement.classList.remove("form-success")
			expr.parentElement.classList.add("form-invaild")
			result.innerHTML = '#Error';
		})
}