[<- back](./TOC.md)

# Contentful

We use contentful for content managment in this website. All the content in **/about** and **/paintings** is fetched from contentful.

## Content models in this sites contentful space

Our contentful space contains the following models:

1. Biography - _Bio text for about me page_
2. Collection - _A collection of paintings._
3. Curriculum - _Curriculum vitae._
4. cv entry - _One entry for the cv._
5. cv entry 2 - _One entry for the cv without a year._
6. cv section - _Represent one section in the CV._
7. Gallery - _Gallery, where all the paintigs will be shown_
8. statement - _Artist's statement._
9. Post - _Defines model for a blog post._

These models should be used in hierarchically like this:

-   Biography
-   Curriculum - curriculum contains sections
    -   cv section - sections contain entries
        -   cv entry
        -   cv entry 2
-   Statement
-   Gallery - gallery contains collections
    -   Collection
-   Post

There should only ever exist one entry of the top level content types so don't add more of those!

## Adding content to this site

If you want to add something to this site, you must have access to the sites contentful space. First you need an account for that. Head over to https://www.contentful.com/sign-up/ and create an account (you can do it easily with google). Then request me to add you as an collaborator to the sites space.

### Adding content

![image](./images/contentful.PNG)

In the image above, you can see the _Content_ tab of our contentful space. Here you can add all the content you want. On the left, you can see all the content types you can modify. Click on something you want to change, for example gallery and the entries found should show only gallery content types. You can then click the entry you want to modify and that should be easy from there!
