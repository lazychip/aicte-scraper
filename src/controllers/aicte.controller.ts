import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
const cheerio = require("cheerio");
const rp = require("request-promise");
import {} from "jquery";

class AicteController {
  public async getInitiatives(req: Request, res: Response) {
    const options = {
      uri: "https://www.aicte-india.org/initiatives",
      transform: function(body) {
        return cheerio.load(body);
      }
    };
    const $ = await rp(options);
    const main = $(".view-content").eq(1);
    const imgs = main.find("img");
    const contents = main.find("span.field-content");
    const links = main.find("a");
    let initiatives: Array<Initiative> = [];
    for (let i = 0; i < imgs.length; i++) {
      initiatives.push({
        imgSrc: imgs[i].attribs.src,
        textContent: contents[i].children[0].data,
        link: links[i].attribs.href
      });
    }
    return res.json(initiatives);
  }
}

interface Initiative {
  imgSrc: string;
  textContent: string;
  link: string;
}

export const aicteController = new AicteController();
