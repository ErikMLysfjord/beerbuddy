# Accessibility measures for the application
This document describes the accessibility measures that were taken to make the application more accessible. Into two different categories: UX-Design and Screen reader support. Each category is described in a separate section, and the different measures are described in detail in each section.

## Table of contents
- [UX-Design](#ux-design)
    - [Color scheme](#color-scheme)
    - [Font](#font)
    - [Reduced information density](#reduced-information-density)
    - [Focus indicators](#focus-indicators)
    - [Section headings](#section-headings)
    - [Tooltips](#tooltips)
    - [User feedback on actions](#user-feedback-on-actions)
    - [Labelling of interactive elements](#labelling-of-interactive-elements)
    - [Ant-design components](#ant-design-components)
    - [Responsive design](#responsive-design)
- [Screen reader support](#screen-reader-support)
    - [HTML semantics](#html-semantics)
    - [ARIA attributes](#aria-attributes)
    - [Skip to content](#skip-to-content)
    - [Screen readers and infinite scroll](#screen-readers-and-infinite-scroll)

## UX-Design<a name="ux-design"></a>
The design of the application was made with accessibility in mind, to make it as easy as possible for people with disabilities to use the application. Design choices that reinforce this, will also lead to a better user experience for everyone. The design choices that were made to make the application more accessible are listed below, and are explained in more detail in the following sections:

### Color scheme<a name="color-scheme"></a>
The color scheme of the application was chosen to be as accessible as possible. The colors were chosen to have a high contrast, and to be distinguishable from each other. We wanted to use a color scheme that was not too bright, to make it easier to use the application in a dark environment, which is why we use a dark theme with yellow highlights for the application. The yellow colors catches the eye, and is used for action buttons and other elements that the user should be able to find easily. The dark theme is also easier on the eyes, and makes it easier to focus on the content of the application.

### Font<a name="font"></a>
The font used in the application is `Inter` by Rasmus Andersson. This font was chosen because it is a very readable font, and it is also very accessible. The font is available in many different weights, which makes it possible to use different weights to emphasize different parts of the application. The design heavily relies on the font weight and size to make the application more accesible and easier to use.

### Reduced information density<a name="reduced-information-density"></a>
The application is designed to have a low information density. This means that there is not a lot of information on the screen at the same time. This makes it easier to focus on the information that is on the screen, and it makes it easier to navigate the application. The application is designed to have a lot of whitespace, which makes it easier to read the information on the screen.

### Focus indicators<a name="focus-indicators"></a>
The application has focus indicators for all interactive elements. This makes it easier to navigate the application using the keyboard, and it makes it easier to see what element is currently focused. The focus indicators are also used to show which element is currently selected in a list, and to show which element is currently being dragged.

### Section headings<a name="section-headings"></a>
The application uses section headings to divide the content of the application into different sections. This makes it easier to navigate the application, and it makes it easier to find the information that you are looking for. The section headings are also used to make the application more accessible for screen readers.

### Tooltips<a name="tooltips"></a>
For the filters in the application, we use tooltips to explain what the different filters do. This makes it easier to understand what the filters do, and it makes it easier to use the filters. The tooltips are also used to make the application more accessible for screen readers.

### User feedback on actions<a name="user-feedback-on-actions"></a>
The application gives the user feedback when they perform an action through ant-design's message components. This component is a popup message that clearly indicates wether the action was a success or an error. This makes it easier to understand what happened when you perform an action.

### Labelling of interactive elements<a name="labelling-of-interactive-elements"></a>
 Interactive elements in the application are clearly labelled. This makes it easier to understand what the different elements do, and it makes it easier to use the application. Select buttons and textfield are examples of labeled components.

### Ant-design components<a name="ant-design-components"></a>
The application uses ant-design components for most of the interactive elements. These components are designed to be accessible, and is a commonly used library for user-friendly components.

### Responsive design<a name="responsive-design"></a>
The application is designed to be responsive, and to work on different screen sizes.

## Screen reader support<a name="screen-reader-support"></a>
Screen readers are used by people with visual impairments to navigate the web. This is our measures to make the application more accessible for screen readers:

### HTML semantics<a name="html-semantics"></a>
HTML are important for accessibility because it provides semantic information about the content of the application. This makes it easier for screen readers to understand the content of the application, and it makes it easier to navigate the application using the keyboard. The application uses semantic HTML, and HTML5 tags like `<main>`, `<header>`, `<nav>`, `<section>`

### ARIA attributes<a name="aria-attributes"></a>
ARIA attributes like `aria-label` are used to make the application more accessible for screen readers. These attributes are used to provide additional information about the content of the application, and to make it easier to navigate the application using the keyboard. The application uses ARIA attributes for all interactive elements, and for all elements that are not self-explanatory.

### Skip to content<a name="skip-to-content"></a>
The application has a "skip to content" link that makes it possible to skip the navigation and go directly to the content of the application. This makes it easier to navigate the application using the keyboard.

### Screen readers and infinite scroll<a name="screen-readers-and-infinite-scroll"></a>
The application uses infinite scroll to load more data when the user scrolls to the bottom of the page. To exit the infinite scroll with keyboard navigation, the user can press the `Esc` key. This will exit the infinite scroll, and the user can continue to navigate the application using the keyboard.