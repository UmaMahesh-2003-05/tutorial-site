const languages = {
    python: {
      name: "Python",
      icon: "/icons/python.png",
      defaultCode: `# Online Python compiler\n# Write and run Python 3 code\nprint("Hello from Python!")`,
      filename: "main.py",
    },
    javascript: {
      name: "JavaScript",
      icon: "/icons/javascript.png",
      defaultCode: `// Online JavaScript compiler\n// Write and run JS code\nconsole.log("Hello from JavaScript!");`,
      filename: "main.js",
    },
    typescript: {
      name: "TypeScript",
      icon: "/icons/typescript.png",
      defaultCode: `// Online TypeScript compiler\n// Type-safe JS code here\nlet message: string = "Hello from TypeScript!";\nconsole.log(message);`,
      filename: "main.ts",
    },
    java: {
      name: "Java",
      icon: "/icons/java.png",
      defaultCode: `// Online Java compiler\n// Write and run Java code\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from Java!");\n  }\n}`,
      filename: "Main.java",
    },
    c: {
      name: "C",
      icon: "/icons/c.png",
      defaultCode: `// Online C compiler\n#include <stdio.h>\n\nint main() {\n  printf("Hello from C!\\n");\n  return 0;\n}`,
      filename: "main.c",
    },
    cpp: {
      name: "C++",
      icon: "/icons/cpp.png",
      defaultCode: `// Online C++ compiler\n#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello from C++!" << endl;\n  return 0;\n}`,
      filename: "main.cpp",
    },
    ruby: {
      name: "Ruby",
      icon: "/icons/ruby.png",
      defaultCode: `# Online Ruby compiler\n# Write and run Ruby code\nputs "Hello from Ruby!"`,
      filename: "main.rb",
    },
    php: {
      name: "PHP",
      icon: "/icons/php.png",
      defaultCode: `<?php\n// Online PHP compiler\necho "Hello from PHP!";\n?>`,
      filename: "main.php",
    },
    go: {
      name: "Go",
      icon: "/icons/go.png",
      defaultCode: `// Online Go compiler\npackage main\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello from Go!")\n}`,
      filename: "main.go",
    },
    swift: {
      name: "Swift",
      icon: "/icons/swift.png",
      defaultCode: `// Online Swift compiler\nimport Foundation\n\nprint("Hello from Swift!")`,
      filename: "main.swift",
    },
    rust: {
      name: "Rust",
      icon: "/icons/rust.png",
      defaultCode: `// Online Rust compiler\nfn main() {\n    println!("Hello from Rust!");\n}`,
      filename: "main.rs",
    },
    r: {
      name: "R",
      icon: "/icons/r.png",
      defaultCode: `## Online R compiler\n## Write and run R code\nmessage <- "Hello from R!"\nprint(message)`,
      filename: "main.r",
    },
    kotlin: {
      name: "Kotlin",
      icon: "/icons/kotlin.png",
      defaultCode: `// Online Kotlin compiler\nfun main() {\n    println("Hello from Kotlin!")\n}`,
      filename: "main.kt",
    },
    bash: {
      name: "Bash",
      icon: "/icons/bash.png",
      defaultCode: `#!/bin/bash\n# Online Bash script\necho "Hello from Bash!"`,
      filename: "main.sh",
    },
    csharp: {
      name: "C#",
      icon: "/icons/csharp.png",
      defaultCode: `// Online C# compiler\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello from C#!");\n    }\n}`,
      filename: "main.cs",
    },
  };
  
  export default languages;
  