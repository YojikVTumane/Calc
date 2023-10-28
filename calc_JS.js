let a = 0;
let b = '';
let previous = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '%', '+/-', '%'];

//display
const output = document.querySelector('.UI-calc-screen p');
const fantomOutput = document.querySelector('.UI-fantom-screen p1');
output.textContent = 0;
fantomOutput.textContent = 0;

function Clear () {
	a = 0;
	b = '';
	previous = '';
	sign = '';
	finish = false;
	output.textContent = 0;
	fantomOutput.textContent = 0;
}

document.querySelector('.ac').onclick = Clear;

document.querySelector('.buttons').onclick = (event) => {
	if(!event.target.classList.contains('btn')) return;
	if(event.target.classList.contains('ac')) return;

	output.textContent = '';

	const key = event.target.textContent;

	if(digit.includes(key)){
		if(b ==='' && sign === ''){
			a += key;
			console.log(a,b,sign);
			output.textContent = a;
		}
		else if(a !== '' && b !== '' && finish){
			b = key;
			finish = false;
			output.textContent = b;
		}
		else{
			b += key;
			output.textContent = b;
		}
		console.log(a,b,sign);
	}

	if(action.includes(key)){
		if(key !== '+/-' && key !== '%'){
			sign = key;
			output.textContent = sign;
			fantomOutput.textContent = ' ' + a + ' ' + sign + ' ';
			console.log(a,b,sign);
			return;
		}
		if(key === '+/-'){
			a = -a;
			output.textContent = a;
			console.log(a,b,sign);
			return;
		}
	}

	if(key === '='){
		previous = a;
		if(b == '') {
			b = a;
		}
		switch (sign){
			case '+':
				a = (+a) + (+b);
				break;
			case '-':
				a = a - b;
				break;
			case 'x':
				a = a * b;
				break;
			case '/':
				if(b === '0'){
					output.textContent = 0;
					fantomOutput.textContent = 'Error';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a = a / b;
				break;
		}
		finish = true;
		fantomOutput.textContent = previous + ' ' + sign + ' ' + b + ' ' + '=';
		output.textContent = a;
		console.table(a, b, sign);
	}
}


