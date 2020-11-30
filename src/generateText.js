export default async function generateText(currentTemp, laterTemp) {

    let current = { 
        temp: currentTemp,
        level: 0,
        sentence: ''
    };
    let later = { 
        temp: laterTemp,
        level: 0,
        sentence: ''
    };

    const bands = [
        { band: 'nochilli', min: 16 },
        { band: 'littlechilli', min: 10 },
        { band: 'chilli', min: 5 },
        { band: 'bigchilli', min: 0 }
    ]

    // Categorise current
    for (var i = 0; i < bands.length; i++) {
        if (currentTemp >= bands[i].min) {
            current.band = bands[i].band;
            current.level = i + 1;
            break;
        }
        current.band = 'massivechilli'; // if under 0
    }

    // Categorise later
    for (i = 0; i < bands.length; i++) {
        if (laterTemp >= bands[i].min) {
            later.band = bands[i].band;
            later.level = i + 1;
            break;
        }
        later.band = 'massivechilli'; // if under 0
    }

    let part1;
    let part2;
    let interim;
    let aOrAnother;

    if (later.level === current.level) {
        interim = 'And, ';
        aOrAnother = 'another';
    } else {
        interim = 'But, ';
        aOrAnother = 'a';
    }

    switch(current.band) {
        case 'nochilli':
            part1 = 'There\'s no chilli today, not even a little one.';
            break;
        case 'littlechilli':
            part1 = 'It\'s a little chilli today.';
            break;
        case 'chilli':
            part1 = 'It\'s chilli today, just a normal one.';
            break;
        case 'bigchilli':
            part1 = 'Oh no, it\'s a big chilli!';
            break;
        case 'massivechilli':
            part1 = 'It\'s a fucking massive chilli,and it\'s frozen!';
            break;
        default:
            console.error('Something went wrong.')

    }

    switch(later.band) {
        case 'nochilli':
            part2 = 'it\'s not going to be chilli later';
            if (aOrAnother === 'another') {
                part2 += ', either.';
            } else {
                part2 =+ '.';
            }
            break;
        case 'littlechilli':
            part2 = `there'll be ${aOrAnother} little chilli later.`;
            break;
        case 'chilli':
            part2 = `it's gonna be ${aOrAnother} normal one later.`;
            break;
        case 'bigchilli':
            part2 = `there's ${aOrAnother} big chilli coming later!`;
            break;
        case 'massivechilli':
            part2 = `there's gonna be ${aOrAnother} huge frozen chilli later!!`;
            break;
        default:
            console.error('Something went wrong.');
    }

    current.sentence = part1;
    later.sentence = interim + part2

    return { current, later };
}