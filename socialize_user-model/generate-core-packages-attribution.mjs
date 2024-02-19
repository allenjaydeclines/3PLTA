import fs from "fs";
import path from "path";
 
const TEMPLATE_SEPARATOR =
  "--------------------------------- (separator) ----------------------------------";
const TEMPLATE_DEPENDENCY_HEADER = "== Dependency";
const TEMPLATE_LICENSE_TYPE_HEADER = "== License Type";
const TEMPLATE_COPYRIGHT_HEADER = "== Copyright";
 
const VERSION_FILEPATH = ".meteor/versions";
const METEOR_LICENSE_FILEPATH = "meteor-license";
const LICENSE_DIST_FILEPATH = "core-packages-licenses.txt";
 
const packageList = fs.readFileSync(VERSION_FILEPATH, "utf8");
const packageDetails = packageList.split("\n").filter((p) => p);
const packages = packageDetails.map((p) => p.split("@")[0]);
const corePackages = packages.filter((p) => !p.includes(":"));
const otherPackages = packages.filter((p) => p.includes(":"));
 
let licenses = "";
if (corePackages.length !== 0) {
  const meteorLicense = fs.readFileSync(METEOR_LICENSE_FILEPATH, "utf8");
  const copyright = meteorLicense.split("\n")[2];
 
  corePackages.forEach((packageName) => {
    let license = `${TEMPLATE_SEPARATOR}\n\n${TEMPLATE_DEPENDENCY_HEADER}\n${packageName}\n\n${TEMPLATE_LICENSE_TYPE_HEADER}\n${meteorLicense}\n\n${TEMPLATE_COPYRIGHT_HEADER}\n${copyright}\n\n`;
    licenses += license;
  });
}
fs.writeFileSync(LICENSE_DIST_FILEPATH, licenses, "utf8");
 
if (otherPackages.length !== 0) {
  console.log(
    "Following packages are non-core packages. Compile licensing and copyright notices manually:"
  );
  console.log(JSON.stringify(otherPackages));
}