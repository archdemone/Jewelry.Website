                   SSUUMMMMAARRYY OOFF LLEESSSS CCOOMMMMAANNDDSS

      Commands marked with * may be preceded by a number, _N.
      Notes in parentheses indicate the behavior if _N is given.
      A key preceded by a caret indicates the Ctrl key; thus ^K is ctrl-K.

h H Display this help.
q :q Q :Q ZZ Exit.

---

                           MMOOVVIINNGG

e ^E j ^N CR _ Forward one line (or \_N lines).
y ^Y k ^K ^P _ Backward one line (or *N lines).
ESC-j \* Forward one file line (or *N file lines).
ESC-k _ Backward one file line (or \_N file lines).
f ^F ^V SPACE _ Forward one window (or *N lines).
b ^B ESC-v \* Backward one window (or *N lines).
z _ Forward one window (and set window to \_N).
w _ Backward one window (and set window to _N).
ESC-SPACE _ Forward one window, but don't stop at end-of-file.
ESC-b * Backward one window, but don't stop at beginning-of-file.
d ^D \* Forward one half-window (and set half-window to *N).
u ^U _ Backward one half-window (and set half-window to \_N).
ESC-) RightArrow _ Right one half screen width (or *N positions).
ESC-( LeftArrow \* Left one half screen width (or *N positions).
ESC-} ^RightArrow Right to last column displayed.
ESC-{ ^LeftArrow Left to first column.
F Forward forever; like "tail -f".
ESC-F Like F but stop when search pattern is found.
r ^R ^L Repaint screen.
R Repaint screen, discarding buffered input.

---

Default "window" is the screen height.
Default "half-window" is half of the screen height.

---

                          SSEEAARRCCHHIINNGG

/*p*a*t*t*e*r*n \* Search forward for (*N-th) matching line.
?*p*a*t*t*e*r*n \* Search backward for (*N-th) matching line.
n _ Repeat previous search (for \_N-th occurrence).
N _ Repeat previous search in reverse direction.
ESC-n _ Repeat previous search, spanning files.
ESC-N _ Repeat previous search, reverse dir. & spanning files.
^O^N ^On _ Search forward for (\_N-th) OSC8 hyperlink.
^O^P ^Op _ Search backward for (*N-th) OSC8 hyperlink.
^O^L ^Ol Jump to the currently selected OSC8 hyperlink.
ESC-u Undo (toggle) search highlighting.
ESC-U Clear search highlighting.
&*p*a*t*t*e*r*n \_ Display only matching lines.

---

Search is case-sensitive unless changed with -i or -I.
A search pattern may begin with one or more of:
^N or ! Search for NON-matching lines.
^E or \_ Search multiple files (pass thru END OF FILE).
^F or @ Start search at FIRST file (for /) or last file (for ?).
^K Highlight matches, but don't move (KEEP position).
^R Don't use REGULAR EXPRESSIONS.
^S *n Search for match in *n-th parenthesized subpattern.
^W WRAP search if no match found.
^L Enter next character literally into pattern.

---

                           JJUUMMPPIINNGG

g < ESC-< _ Go to first line in file (or line \_N).
G > ESC-> _ Go to last line in file (or line *N).
p % \* Go to beginning of file (or *N percent into file).
t _ Go to the (\_N-th) next tag.
T _ Go to the (_N-th) previous tag.
{ ( [ _ Find close bracket } ) ].
} ) ] \* Find open bracket { ( [.
ESC-^F *<*c*1*> *<*c*2*> \* Find close bracket *<*c*2*>.
ESC-^B *<*c*1*> *<*c*2*> \* Find open bracket *<*c*1*>.

---

Each "find close bracket" command goes forward to the close bracket
matching the (\*N-th) open bracket in the top line.
Each "find open bracket" command goes backward to the open bracket
matching the (\_N-th) close bracket in the bottom line.

m*<*l*e*t*t*e*r*> Mark the current top line with <letter>.
M*<*l*e*t*t*e*r*> Mark the current bottom line with <letter>.
'*<*l*e*t*t*e*r*> Go to a previously marked position.
'' Go to the previous position.
^X^X Same as '.
ESC-m*<*l*e*t*t*e*r*> Clear a mark.

---

A mark is any upper-case or lower-case letter.
Certain marks are predefined:
^ means beginning of the file
$ means end of the file

---

                        CCHHAANNGGIINNGG FFIILLEESS

:e [_f_i_l_e] Examine a new file.
^X^V Same as :e.
:n _ Examine the (\_N-th) next file from the command line.
:p _ Examine the (*N-th) previous file from the command line.
:x \* Examine the first (or *N-th) file from the command line.
^O^O Open the currently selected OSC8 hyperlink.
:d Delete the current file from the command line list.
= ^G :f Print current file name.

---

                    MMIISSCCEELLLLAANNEEOOUUSS CCOOMMMMAANNDDSS

-*<*f*l*a*g*> Toggle a command line option [see OPTIONS below].
--*<*n*a*m*e*> Toggle a command line option, by name.
**<*f*l*a*g*> Display the setting of a command line option.
***<*n*a*m*e*> Display the setting of an option, by name. +*c*m*d Execute the less cmd each time a new file is examined.

!*c*o*m*m*a*n*d Execute the shell command with $SHELL. #*c*o*m*m*a*n*d Execute the shell command, expanded like a prompt.
|XX*c*o*m*m*a*n*d Pipe file between current pos & mark XX to shell command.
s *f*i*l_e Save input to a file.
v Edit the current file with $VISUAL or $EDITOR.
V Print version number of "less".

---

                           OOPPTTIIOONNSS

        Most options may be changed either on the command line,
        or from within less by using the - or -- command.
        Options may be given in one of two forms: either a single
        character preceded by a -, or a name preceded by --.

-? ........ --help
Display help (from command line).
-a ........ --search-skip-screen
Search skips current screen.
-A ........ --SEARCH-SKIP-SCREEN
Search starts just after target line.
-b [_N] .... --buffers=[_N]
Number of buffers.
-B ........ --auto-buffers
Don't automatically allocate buffers for pipes.
-c ........ --clear-screen
Repaint by clearing rather than scrolling.
-d ........ --dumb
Dumb terminal.
-D xx*c*o*l*o*r . --color=xx*c*o*l*o*r
Set screen colors.
-e -E .... --quit-at-eof --QUIT-AT-EOF
Quit at end of file.
-f ........ --force
Force open non-regular files.
-F ........ --quit-if-one-screen
Quit if entire file fits on first screen.
-g ........ --hilite-search
Highlight only last match for searches.
-G ........ --HILITE-SEARCH
Don't highlight any matches for searches.
-h [_N] .... --max-back-scroll=[_N]
Backward scroll limit.
-i ........ --ignore-case
Ignore case in searches that do not contain uppercase.
-I ........ --IGNORE-CASE
Ignore case in all searches.
-j [_N] .... --jump-target=[_N]
Screen position of target lines.
-J ........ --status-column
Display a status column at left edge of screen.
-k *f*i*l*e ... --lesskey-file=*f*i*l*e
Use a compiled lesskey file.
-K ........ --quit-on-intr
Exit less in response to ctrl-C.
-L ........ --no-lessopen
Ignore the LESSOPEN environment variable.
-m -M .... --long-prompt --LONG-PROMPT
Set prompt style.
-n ......... --line-numbers
Suppress line numbers in prompts and messages.
-N ......... --LINE-NUMBERS
Display line number at start of each line.
-o [_f_i_l_e] .. --log-file=[_f_i_l_e]
Copy to log file (standard input only).
-O [_f_i_l_e] .. --LOG-FILE=[_f_i_l_e]
Copy to log file (unconditionally overwrite).
-p *p*a*t*t*e*r*n . --pattern=[*p*a*t*t*e*r*n]
Start at pattern (from command line).
-P [_p_r_o_m_p_t] --prompt=[_p_r_o_m_p_t]
Define new prompt.
-q -Q .... --quiet --QUIET --silent --SILENT
Quiet the terminal bell.
-r -R .... --raw-control-chars --RAW-CONTROL-CHARS
Output "raw" control characters.
-s ........ --squeeze-blank-lines
Squeeze multiple blank lines.
-S ........ --chop-long-lines
Chop (truncate) long lines rather than wrapping.
-t *t*a*g .... --tag=[*t*a*g]
Find a tag.
-T [_t_a_g_s_f_i_l_e] --tag-file=[_t_a_g_s_f_i_l_e]
Use an alternate tags file.
-u -U .... --underline-special --UNDERLINE-SPECIAL
Change handling of backspaces, tabs and carriage returns.
-V ........ --version
Display the version number of "less".
-w ........ --hilite-unread
Highlight first new line after forward-screen.
-W ........ --HILITE-UNREAD
Highlight first new line after any forward movement.
-x [*N[,...]] --tabs=[*N[,...]]
Set tab stops.
-X ........ --no-init
Don't use termcap init/deinit strings.
-y [_N] .... --max-forw-scroll=[_N]
Forward scroll limit.
-z [_N] .... --window=[_N]
Set size of window.
-" [*c[*c]] . --quotes=[*c[*c]]
Set shell quote characters.
-~ ........ --tilde
Don't display tildes after end of file.
-# [_N] .... --shift=[_N]
Set horizontal scroll amount (0 = one half screen width).

                --exit-follow-on-close
                  Exit F command on a pipe when writer closes pipe.
                --file-size
                  Automatically determine the size of the input file.
                --follow-name
                  The F command changes files if the input file is renamed.
                --form-feed
                  Stop scrolling when a form feed character is reached.
                --header=[_L[,_C[,_N]]]
                  Use _L lines (starting at line _N) and _C columns as headers.
                --incsearch
                  Search file as each pattern character is typed in.
                --intr=[_C]
                  Use _C instead of ^X to interrupt a read.
                --lesskey-context=_t_e_x_t
                  Use lesskey source file contents.
                --lesskey-src=_f_i_l_e
                  Use a lesskey source file.
                --line-num-width=[_N]
                  Set the width of the -N line number field to _N characters.
                --match-shift=[_N]
                  Show at least _N characters to the left of a search match.
                --modelines=[_N]
                  Read _N lines from the input file and look for vim modelines.
                --mouse
                  Enable mouse input.
                --no-edit-warn
                  Don't warn when using v command on a file opened via LESSOPEN.
                --no-keypad
                  Don't send termcap keypad init/deinit strings.
                --no-histdups
                  Remove duplicates from command history.
                --no-number-headers
                  Don't give line numbers to header lines.
                --no-paste
                  Ignore pasted input.
                --no-search-header-lines
                  Searches do not include header lines.
                --no-search-header-columns
                  Searches do not include header columns.
                --no-search-headers
                  Searches do not include header lines or columns.
                --no-vbell
                  Disable the terminal's visual bell.
                --redraw-on-quit
                  Redraw final screen when quitting.
                --rscroll=[_C]
                  Set the character used to mark truncated lines.
                --save-marks
                  Retain marks across invocations of less.
                --search-options=[EFKNRW-]
                  Set default options for every search.
                --show-preproc-errors
                  Display a message if preprocessor exits with an error status.
                --proc-backspace
                  Process backspaces for bold/underline.
                --PROC-BACKSPACE
                  Treat backspaces as control characters.
                --proc-return
                  Delete carriage returns before newline.
                --PROC-RETURN
                  Treat carriage returns as control characters.
                --proc-tab
                  Expand tabs to spaces.
                --PROC-TAB
                  Treat tabs as control characters.
                --status-col-width=[_N]
                  Set the width of the -J status column to _N characters.
                --status-line
                  Highlight or color the entire line containing a mark.
                --use-backslash
                  Subsequent options use backslash as escape char.
                --use-color
                  Enables colored text.
                --wheel-lines=[_N]
                  Each click of the mouse wheel moves _N lines.
                --wordwrap
                  Wrap lines at spaces.

---

                          LLIINNEE EEDDIITTIINNGG

        These keys can be used to edit text being entered
        on the "command line" at the bottom of the screen.

RightArrow ..................... ESC-l ... Move cursor right one character.
LeftArrow ...................... ESC-h ... Move cursor left one character.
ctrl-RightArrow ESC-RightArrow ESC-w ... Move cursor right one word.
ctrl-LeftArrow ESC-LeftArrow ESC-b ... Move cursor left one word.
HOME ........................... ESC-0 ... Move cursor to start of line.
END ............................ ESC-$ ... Move cursor to end of line.
BACKSPACE ................................ Delete char to left of cursor.
DELETE ......................... ESC-x ... Delete char under cursor.
ctrl-BACKSPACE ESC-BACKSPACE ........... Delete word to left of cursor.
ctrl-DELETE .... ESC-DELETE .... ESC-X ... Delete word under cursor.
ctrl-U ......... ESC (MS-DOS only) ....... Delete entire line.
UpArrow ........................ ESC-k ... Retrieve previous command line.
DownArrow ...................... ESC-j ... Retrieve next command line.
TAB ...................................... Complete filename & cycle.
SHIFT-TAB ...................... ESC-TAB Complete filename & reverse cycle.
ctrl-L ................................... Complete filename, list all.
