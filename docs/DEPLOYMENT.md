[<- back](./TOC.md)

# Deployment

Currently our deployment process uses a **GitHub Actions** pipeline. The main pipeline process is described in a file called [main.yml](../.github/workflows/main.yml) and is written with **YAML**. The pipeline is somewhat based on the free online university of Helsinki course's *Fullstack open* [chapter 11](https://fullstackopen.com/en/part11) pipeline.

What does our pipeline do exactly? It lints and checks the project builds on pull request. If the pull request is merged to master or commits are pushed to master, the pipeline also tries to deploy our code and version our code (more about versioning in this project below). In deployment, we use [appleboy/ssh-action](https://github.com/appleboy/ssh-action) to run scripts remotly on our Digital Ocean server. SSH login information is stored in GitHub secrets! rember that if you want to run your pipelines locally for testing purposes, there is a great [tool](https://github.com/nektos/act) for that! While developing pipelines, keep in mind that GitHub Actions have a limited monthly free hours, so try to make your pipelines consume as little time as possible!

If you merge or push to master, but you don't want to deploy and version, you can include `#skip` in your commit message! This may be useful in some situations...

If you are using third party GitHub Actions (other than actions/some-action@version), prefer hex versioned releases over semantic releases for security reasons!

## Versioning

As I mentioned earlier, our pipeline knows how to version our code automatically, so you don't have to do it most of the time. We use semantic versioning in this project (major.minor.patch eg. 1.7.6). The default version bumped on merge or push to master is minor. In case you want to bump patch or major, you have to write ```#patch``` or ```#major``` on your commit message, like this `git commit -m "my awesome new patch #patch"`. Using `#none` in commit message skips all bumping. If you want to change the default versioning for any reason at all, you can do it in env on *Bump version and push tag* step by adding `DEFAULT_BUMP:` like this:

```yml
- name: Bump version and push tag
  if: ${{ github.event_name == 'push' && !contains(join(github.event.commits.*.message), '#skip') }}
  uses: anothrNick/github-tag-action@eca2b69f9e2c24be7decccd0f15fdb1ea5906598 # let's use a hash version
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    DEFAULT_BUMP: patch # patch is now default!
```
We use [GitHub Tag Action](https://github.com/anothrNick/github-tag-action) for automatic versioning!
