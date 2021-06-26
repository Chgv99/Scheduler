module.exports = function (input) {
    numbers = input.split('');
    var result = [];
    numbers.forEach(number => {
        switch (parseInt(number)) {
            case 1:
                console.log(':one:');
                result.push(':one:');
                break;
            case 2:
                result.push(':two:');
                break;
            case 3:
                result.push(':three:');
                break;
            case 4:
                result.push(':four:');
                break;
            case 5:
                result.push(':five:');
                break;
            case 6:
                result.push(':six:');
                break;
            case 7:
                result.push(':seven:');
                break;
            case 8:
                result.push(':eight:');
                break;         
            case 9:
                result.push(':nine:');
                break;
            case 0:
                result.push(':zero:');
                break;
            default:
                result.push(':x:');
                break;
        }
    });
    console.log("return result: ")
    console.log(result);
    return result;
};