const capturingGroupType = /(\w*:\s)/; // 'type: '
const capturingGroupSubject = /([^[].+)/; // 'subject'


/*
  ❌ Bad commit messages
  git commit -m "fix something"
  // No type specified; needs to be in 'type: subject' format.

  git commit -m "TASK-456 fix something"
  // Includes an identifier but lacks the 'type:' prefix.

  git commit -m "fix - something"
  // Uses incorrect separator; should be 'fix: something'.

  ✅ Good commit messages
  git commit -m "fix: correct issue in user login"
  // Correct format with 'type: subject'. 'fix' is a valid type and 'correct issue in user login' is the subject.

  git commit -m "[TASK-456] fix: correct issue in user login"
  // Includes an identifier (optional) and correctly follows 'type: subject' format.
*/


module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        "^" + capturingGroupType.source + capturingGroupSubject.source + "$"
      ),
      headerCorrespondence: ["type", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-pattern": (parsed) => {
          const { type, subject } = parsed;
          if (type === null && subject === null) {
            return [false, "commit message must be in format 'type: subject'"];
          }
          return [true, ""];
        },
        "check-type": (parsed, _when, expectedValue) => {
          const { type } = parsed;
          if (
            type &&
            !Object.keys(expectedValue).includes(type.split(":")[0])
          ) {
            return [
              false,
              `commit message must be in format 'type: subject'\ntype must be one of:\n${Object.keys(
                expectedValue
              )
                //type - description
                .map((type) => `${type} - ${expectedValue[type]}`)
                .join("\n")}`,
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "header-match-pattern": [2, "always"],
    "check-type": [
      2,
      "always",
      {
        feat: "A new feature ",
        chore: "Tooling, configuration changes, or maintenance updates",
        fix: "A bug fix",
        docs: "Documentation updates",
        refactor: "Code changes that do not add new features",
        perf: "improving performance",
        test: "Adding or updating tests",
        style: "CSS or styling changes",
        build: "changes that affect the build system",
      },
    ],
  },
};
