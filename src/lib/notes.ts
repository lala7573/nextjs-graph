import * as fs from "fs";
import path from "path";
import glob from "glob";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const notesDir = path.join(".", "notes");

const getNotes = () => {
  return glob
    .sync(path.join(notesDir, "**/*"), { nodir: true })
    .map((fileName: string) =>
      path.join(".", `${fileName.slice(notesDir.length)}`)
    );
};

export async function getNote(id: string[]) {
  const fullPath = path.join(notesDir, `${id.join("/")}.md`);
  const content = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(content);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

type NoteMeta = { [k: string]: any };
export function getSortedNotesData() {
  const fileNames = getNotes();
  const allPostsData: { [k: string]: any } = fileNames.map(
    (fileName: string) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(notesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf-8");

      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
      };
    }
  );

  return allPostsData.sort((a: NoteMeta, b: NoteMeta) => {
    if (a?.date < b?.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllNotesIds() {
  const files = getNotes();
  return files.map((fileName: string) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "").split("/"),
      },
    };
  });
}
