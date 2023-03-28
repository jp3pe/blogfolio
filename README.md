# Blogfolio

## What is this sample?
This is a project to build own blog system in cloud system like Vercel.

## Who can reference this sample?
When you'd like to make your own blog system not using CMS or prebuilt system like Naver blog, Medium, Github Pages.

## Background
I usually worked as back-end developer while I did my project in the university or company.
Oneday, I realized that my skill to make any front-end project is not enough to create something new.
Therefore, I'd like to build my own program to expend my knoledge about JavaScript, TypeScript, ReactJS.
I chose NextJS to use them all.

---

## How to build develop envorinment?
Follow the step below.

1. Clone the project from Github(git clone)
2. Run the command below in project directory.

```bash
yarn dev
```

You can connect to the running website on [http://localhost:3000](http://localhost:3000) with your web browser.

## Publish
### Vercel

Set Build Command in Vercel project setting like below.

```bash
yarn run vercel-deploy
```

---

## How to create new post?
1. Create each directory for post in *[project_directory]/public/blogs* and create markdown file in created directory for blog post named as same as directory name.
2. Set name of representative image as *representative_image.jpg* in *[project_directory]/public/blogs*