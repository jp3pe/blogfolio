# Blogfolio

## What is this sample?
This is a project to build my own blog system in a cloud system like Vercel.

## Who can reference this sample?
When you'd like to make your own blog system not use CMS or a prebuilt system like Naver blog, Medium, or Github Pages.

## Background
I usually worked as a back-end developer while I did my project at the university or company.
One day, I realized that my skill to make any front-end project is not enough to create something new.
Therefore, I'd like to build my program to expand my knowledge about JavaScript, TypeScript, and ReactJS.
I chose NextJS to use them all.

---

## How to build and develop the environment?
Follow the step below.

1. Clone the project from Github(git clone)
2. Run the command below in the project directory.

```bash
yarn dev
```

You can connect to the running website on [http://localhost:3000](http://localhost:3000) with your web browser.

## Publish
### Vercel

Set Build Command in the Vercel project setting like below.

```bash
yarn run vercel-deploy
```

---

## How to create a new post?
1. Create each directory for a post in *[project_directory]/public/blogs* and create a markdown file in the created directory for the blog post named as same as the directory name.
2. Set name of representative image as *representative_image.jpg* in *[project_directory]/public/blogs*