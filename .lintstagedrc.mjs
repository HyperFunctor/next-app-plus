import path from "path";

const buildEslintCommand = (filenames) =>
	`next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

export default {
	"*.{js,mjs,jsx,ts,tsx}": [buildEslintCommand],
	"*.*": ["prettier --write --ignore-unknown"],
};
