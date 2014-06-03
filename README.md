
Simple input validator that insures only the characters you want in an html input box are entered.  Specify which characters are allowed and as well as how many

## Usage

$(inputs).only("ABC123");

or for full functionality

$(inputs).only({allowed:"ABC123",max:10});
