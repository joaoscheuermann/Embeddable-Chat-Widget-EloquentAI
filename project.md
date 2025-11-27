# Context

This is a hiring challenge from Eloquent AI, the company I'm applying to.

The challenge is to create an embeddable chat widget that can be used in any website.

The following document is the challenge description:
```md
**Front-End** **Technical** **Assignment** **–** **Embeddable** **Chat**
**Widget**

Overview

This challenge assesses your ability to design and implement a modern
front-end system for an embeddable chat widget using **React,**
**TypeScript,** **and** **building** **an** **NPM** **package**, while
considering deployment and minimal code integration. You will be
building a **Chat** **Widget** **Package** that can be easily integrated
into any website to provide real-time chat support.

Background

Chat widgets are essential tools for customer engagement and support.
The goal is to create a self-contained React component package that
website owners can install and deploy with minimal code.

Your task is to **design** **and** **build** **an** **npm** **package**
for a chat widget, including: ● Creating an embeddable React component.

> ● Packaging and publishing the component as an npm package. ●
> Providing clear instructions for installation and deployment.

Requirements

1\. Tech Stack

> ● **Frontend:** React + TypeScript ● **Packaging:** NPM
>
> ● **Design:** Follow the design on our website:
> [<u>https://www.eloquentai.co/</u>](https://www.eloquentai.co/) Use
> any component library or custom styling; prioritize clarity and UX.

2\. Core Features

Chat Widget

> ● A visually appealing chat widget component following Eloquent AI
> style. ● Ability to open and close the chat window.
>
> ● Basic chat interaction with an LLM of your choosing.
>
> ● Clear indication of online/offline status (mocked for this
> assignment).
>
> ● Display a clear and visually appealing banner near the input field
> to indicate when the service is in maintenance mode (mocked for this
> assignment). While in maintenance mode, users should be prevented from
> sending messages.

NPM Package

> ● Create a distributable npm package.
>
> ● Provide clear installation and usage instructions in the README. ●
> Ensure the package is easily installable via \`npm install\`.

Embeddability

> ● Design the widget to be easily embeddable with a as little code as
> possible. Take inspiration from
> [<u>chatbase.co</u>](http://chatbase.co) or
> [<u>intercom.com</u>](http://intercom.com).
>
> ● Consider how it will interact with the host website’s styles and
> scripts.

3\. Bonus Features (Optional but Impressive) ● Mock user authentication
or identification.

> ● Simple local persistence for chat messages (e.g., use localStorage).
> ● Customizable appearance via props (colors, icons, etc.).
>
> ● Basic handling of user input and message sending (mocked).

Evaluation Criteria

Your submission will be evaluated based on the following:

1\. Code Quality & Best Practices

> ● Clean, maintainable, and well-documented code. ● Proper use of
> TypeScript best practices.
>
> ● Effective use of React components.

2\. NPM Packaging

> ● Properly configured \`package.json\`.
>
> ● Clear and concise README with usage instructions. ● Easy
> installation and usage of the npm package.

3\. UI/UX

> ● Usability of the chat widget.
>
> ● Smooth user experience, including responsiveness.

4\. Embeddability & Deployment

> ● Ease of embedding the widget with minimal code.
>
> ● Consideration of potential conflicts with host website styles.

Submission Guidelines

> ● Share your GitHub repository with clear README instructions on how
> to: ○ Build and test the React component.
>
> ○ Package and publish the npm package locally.
>
> ○ Install and use the widget on a sample HTML page.
>
> ● Include a brief write-up on how you approached the problem, any
> architectural decisions you made, and challenges you faced.
```

# Objective

I will provide the project structure and architecture and your objective is to implement only the features and the Architecture I outilined here.


# Architecture

This project is a [NX.js](https://nx.dev/docs) monorepo. Refer to NXjs MCP Server or documentation when you have any questions about the structure and how to use it.

## General instructions for Front End code;
- Folder structure:
    - src:
        - queries (all queries to the backend);
        - hooks (all the hooks);
        - components (all components);
        - App.tsx (if an APP);
        - index.tsx (if an library, it will export all the required modules);

## Projects
1. **Chat widget**:
    * Tech stack:
        - Typescript;
        - React;
        - Tailwind;
        - Jest;
        - Thanstack React Query (for server state);
        - Zustand (for client state);
        - React Router (for routing);
        - React Icons (for icons);
        - Radix: https://www.radix-ui.com/themes;
        - Atomic Design as a component structure (https://atomicdesign.bradfrost.com/chapter-2/);
    * It should be created at `apps/widget` folder.
    * This application will be built an will be served as an static webpage by the `backend`;
    * This application will be load as an Iframe from the `@eloquentai/chat-widget-sdk`;
        - This Library will be responsible for displaying and hiding the IFrame chat window, so you don't need to bother handling that here.
    * Since this application will be loaded as an Iframe, it should have some features to enable the `@eloquentai/chat-widget-sdk` to configure and comunicate with the IFrame Window.
        - get some props from the parent window, this props will be sent from the URL query parameters; Initially they will be the Icon, the Primary Color and the Secondary Color;
        - Some way of communicating with the parent window with `postMessage`. Initially I just want the boilerplate code, it shouldn't have to handle any specific logic.
    * The Chat Window should integrate with the backend to handle Chatting, mock it for the moment.
    * Use the https://www.eloquentai.co/ webpage as style reference.

2. **Chat Widget SDK**
    * Tech stack:
        - Typescript
        - React
        - React Icons (for icons);
        - Zustand (for client state);
        - Thanstack React Query (for server state);
        - Radix: https://www.radix-ui.com/themes;
        - Atomic Design as a component structure (https://atomicdesign.bradfrost.com/chapter-2/);
    * It should be created at `packages/chat-widget-sdk`;
    * It should be publishable in NPM;
    * It should contain a README with information on how to publish the package using NX js;
    * It should export a set of hooks to comunicate with the child IFrame;
    * It should render an absolute positioned button that opens the chat window;
    * It should render some UI indicator that the service is: "online", "maintenance" or "offline";

3. **Demo app**:
    - A React + Typescript app that consumes the widget. it will be used to display it's functionality.

4. **Backend**:
    * Tech stack:
        - Typescript;
        - Node.js;
        - Express;
        - Jest;
        - Zod;
    * It should be created at `services/backend` folder.
    * I will outline it's functionality latter.

5. **Types**:
    * It should be created at `packages/types`
    * It will not be publishable in NPM;
