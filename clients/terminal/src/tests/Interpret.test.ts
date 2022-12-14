import { interpret } from '../compiler';

import { KopiString } from '../modules/terminals/classes';

test('Interpret', async () => {
  var string = await interpret(`
    # extend String (
    #   print: () => ()
    # )

    incrementIndex = index => index + 1
    setIndex = index => () => index

    get (value) = match (value 0) (
      "'" => value 1..('size value - 1)
      _   => value
    )

    evaluateAst (statement, indexes) = match statement (
      (lineNo, "PRINT", value) => {
        print (get value)
        incrementIndex
      }
      (lineNo, "GOTO", value) => {
        setIndex (indexes | get value)
      }
    )

    interpret (source) = {
      program = source | trim | split (String.newlineRegExp) | map (line) => {
        let ([lineNo, command, value] = line | trim | splitOnLimit " " 2 | toArray) =>
          (lineNo: lineNo, command, value)
      } | toArray

      indexes = (0..99, program) | reduce (dict = {:}, index, statement) => {
        dict | set (statement.lineNo) index
      }

      let (index = 0) => {
        match (index == 'size program) (
          true => "Done"
          _    => loop (evaluateAst (program index, indexes) index)
        )
      }
    }

    source = "
      10 PRINT 'Hello, world.'
      20 GOTO 40
      30 PRINT 'How are you?'
      40 PRINT 'Goodbye.'
    "

    interpret source
  `) as KopiString;

  expect(string).toEqual(new KopiString('Done'));
});
