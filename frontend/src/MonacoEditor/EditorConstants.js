export const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Nitin");\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Ujjwal")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    php: `<?php\n\n$name = 'Jon Doe';\necho $name;\n`,
    c: `\n#include <stdio.h>\n\nvoid greet(char* name) {\n\tprintf("Hello, %s!\\n", name);\n}\n\nint main() {\n\tgreet("Alex");\n\treturn 0;\n}\n`,
    cpp: `\n#include <iostream>\nusing namespace std;\n\nvoid greet(string name) {\n\tcout << "Hello, " << name << "!" << endl;\n}\n\nint main() {\n\tgreet("Alex");\n\treturn 0;\n}\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
};

export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    python: "3.10.0",
    php: "8.2.3",
    c: "11.2.0",
    cpp: "11.2.0",
    java: "15.0.2",
    typescript: "5.0.3",
};

