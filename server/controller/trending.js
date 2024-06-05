const axios = require("axios");
const { HttpProxyAgent } = require("http-proxy-agent");
const { Builder, By, until } = require("selenium-webdriver");
const moment = require("moment");
const proxy = require("selenium-webdriver/proxy");
const TrendingTopic = require("../model/trend");

const trendFromTwitter = async (req, res) => {
  console.log("Fetching trends from Twitter...");
  const proxyUrl = "http://HOSTNAME:PASSWORD@us-ca.proxymesh.com:31280";

  let driver = new Builder()
    .forBrowser("chrome")
    .setProxy(
      proxy.manual({
        http: proxyUrl,
        https: proxyUrl,
      })
    )
    .build();

  try {
    // Get IP Address
    const agent = new HttpProxyAgent(proxyUrl);
    const response = await axios.get("https://api.ipify.org?format=json", {
      httpAgent: agent,
    });
    const ipAddress = response?.data?.ip;

    // Navigate to Twitter and wait for trending section
    await driver.get("https://twitter.com/explore/tabs/trending");
    await driver.wait(
      until.elementLocated(
        By.xpath("//section[@aria-labelledby='accessible-list-0']")
      ),
      50000
    );
    const trendingSection = await driver.wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath("//section[@aria-labelledby='accessible-list-0']")
        )
      ),
      20000
    );

    // Find trending topics
    const items = await driver.findElements(
      By.xpath(
        "//section[@aria-labelledby='accessible-list-0']//span[contains(text(), '#')]"
      )
    );

    const trendingTopics = [];
    for (let i = 0; i < Math.min(5, items.length); i++) {
      const text = await items[i].getText();
      trendingTopics.push(text || "N/A");
    }

    // Ensure we have exactly 5 topics
    while (trendingTopics.length < 5) {
      trendingTopics.push("N/A");
    }

    const result = {
      trend1: trendingTopics[0],
      trend2: trendingTopics[1],
      trend3: trendingTopics[2],
      trend4: trendingTopics[3],
      trend5: trendingTopics[4],
      date: moment().format("DD-MM-YYYY"),
      ipAddress,
    };

    // Save to MongoDB
    const savedResult = await TrendingTopic.create(result);
    console.log("Trending topics saved:", savedResult);

    res.status(201).json(savedResult);
  } catch (error) {
    console.error("Error fetching trends:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
};

const fetchData = async (req, res) => {
  try {
    const response = await TrendingTopic.find();
    if (response?.length > 0) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "data is not availabel" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
module.exports = { trendFromTwitter, fetchData };
