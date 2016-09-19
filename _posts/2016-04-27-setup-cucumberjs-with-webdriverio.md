---
layout: post
title: Setup CucumberJS with WebdriverIO
---

When it comes to testing your JS code, it is of utmost importance that you include acceptance tests as well, apart from unit tests.
This is where tools like selenium or phantomjs come into play. These tools, help us run tests against our JS in a real browser. If we put
in a bit of effort, we can run those on multiple devices/platforms using services like [saucelabs][1] or [browserstack][2]. 

Enter [WebdriverIO][3]!! WebdriverIO lets you write tests, with actions through which you can control the browser and assert the results. You can use
services such as mocha/cucumber/jasmine. 

Here we will discuss how to setup cucumberJS with WebdriverIO. If you are new to cucumberJS or have not heard about it.
I would suggest, to read about [cucumberJS][4] here. You might not find a lot of information regarding it, since its a bit spread out (might want to use your googling skils :wink: ).

While using cucumberJS for testing, you basically write feature files to test multiple scenarios. For instance, following is a feature file.

```cucumber
# title.feature
Feature: Title check
    I should be able to go to a website
    and check its title

Scenario: Get the title of webpage
    Given I go to the website "http://www.google.com"
    Then I expect the title of the page "Google"
```

If you notice, the syntax is pretty much self explanatory and readable. You must be thinking, really... thats it :open_mouth:? Well, yes and no!
The above code will work as an entry point to your test, but WebdriverIO (the test runner), does not know what those lines mean. This is where ```step definitions``` come in.
Step definitions, as the name suggests is JS code (which the runner understands) for each step in the test. For the above, following are the step definitions:

```javascript
// stepdefinitions.js
const expect = require('chai').expect;

module.exports = function () {
  this.Given(/^I go to the website "([^"]*)"$/, (url) => {
    browser.url(url);
  });

  this.Then(/^I expect the title of the page "([^"]*)"$/, (title) => {
    expect(browser.getTitle()).to.be.eql(title);
  });
}
```

You will notice here that for each ```Given``` and ```Then```, statement we have corresponding JS definitions. These definitions, can be used in other feature/test files
as well. 

>To make things clear, all your test files (or feature files .feature) and step definition files (*.js) are separate. 

Now we have our test files and step definitions in place, its
time to link them up using WebdriverIO, which will bring all these files together and run it for us.

The folder structure looks something like this:

![image](https://cloud.githubusercontent.com/assets/2890683/18640805/4e345176-7ecc-11e6-85ff-d18f9454ac5e.png)

Before we get started, lets install WebdriverIO and cucumber deps first.

```shell
[sudo] npm i -g WebdriverIO
[sudo] npm i -g wdio-cucumber-framework
```

In order to start the browser for testing, we need to install and start selenium. [Selenium][5] is the heart of browser automation testing, and WebdriverIO provides binding for Selenium
in NodeJS.

```
[sudo] npm i selenium-standalone@latest -g
```

Once all of them is installed, navigate to the directory where your feature files and step definitions are present. Assuming that, we have
them in ```~/project_name/test``` directory. Lets continue.

### Invoke WebdriverIO

In order to do so, we need create a configuration file. To create one, type
```
wdio
```
inside ```test``` folder. This will prompt you to create a configuration file and give you 4 options.
For the time being, we will concentrate on the first option as that would help us get webdriverIO up and running on our local machine.

When prompted, select the following options:

```
Where do you want to execute your tests? On my local machine
Which framework do you want to use? cucumber
Shall I install the framework adapter for you? No # we already have installed the adapter 
Where are your feature files located? (./features/**/*.feature) # this is a glob pointing to the folder where all your feature (test files) are located.
Where are your step definitions located? (./features/step-definitions)  # Your step definitions folder
Which reporter do you want to use?  dot - https://github.com/webdriverio/wdio-dot-reporter # default reporter
Shall I install the reporter library for you? Yes
Do you want to add a service to your test setup? Selenium Standalone
Level of logging verbosity silent
In which directory should screenshots gets saved if a command fails? ./errorShots/
What is the base url? http://localhost # In case you did not provide a full url in tests
```

After answering all the questions, it will look like this:

![image](https://cloud.githubusercontent.com/assets/2890683/18639852/2817a0d2-7ec8-11e6-8896-988bdd392ba0.png)

Once that is done, you might want to install assertion library of your own choice. I am using [ChaiJS][6] here. Install and save chaiJS, using

```
npm i --save-dev chai
```

Once you are happy with the configuration, run the tests using (in current directory):

```shell
selenium-standalone install # install selenium
selenium-standalone start # start selenium
wdio wdio.conf.js
```

If everything went according to plan, you will see:

![image](https://cloud.githubusercontent.com/assets/2890683/18640638/8d18bdba-7ecb-11e6-9732-eb4ef55942f7.png)

### TIP
Instead of starting selenium separately, there is a plugin which is part of webdriverIO. This will start selenium and stop selenium 
according to tests. In order to do that, install the plugin first:

```
npm i wdio-selenium-standalone-service --save-dev
```

And, in the ```wdio.conf.js``` file, add the following as parent key

```javascript
exports.config = {
    ...
    services: ['selenium-standalone'],
    ...
}
```

Thats it, you can try running ```wdio wdio.conf.js``` again without starting the selenium-standalone. Please make sure that
the selenium-standalone is not running in background.

Hope this helps someone :smile:. 

In the next tutorial, we will discuss on how to automate the whole process using [Gulp][7].


[1]: https://saucelabs.com/
[2]: https://www.browserstack.com/automate
[3]: http://webdriver.io/
[4]: https://github.com/cucumber/cucumber-js
[5]: http://scraping.pro/what-is-selenium-webdriver/
[6]: http://chaijs.com/
[7]: http://gulpjs.com/