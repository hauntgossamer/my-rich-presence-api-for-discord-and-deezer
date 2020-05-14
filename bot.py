import sys
import requests
from selenium import webdriver
from pynput.keyboard import Key, Controller
from time import sleep
import json

from secrets import email, password
browser = webdriver.Chrome()
 
class TokenGetter():
    def getCode(self):
        browser.get("https://connect.deezer.com/oauth/auth.php?app_id=413642&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fredirect&perms=basic_access,email,listening_history")
        
        browser.find_element_by_xpath("/html/body/div[1]/div/form/div[2]/div/div/div[2]/div/button[1]/span").click()
        browser.find_element_by_xpath("/html/body/div/div[2]/div[1]/form/div/div[1]/div/input").send_keys(email)
        browser.find_element_by_xpath("/html/body/div/div[2]/div[1]/form/div/div[2]/div/input").send_keys(password)
        browser.find_element_by_xpath("/html/body/div/div[2]/div[1]/form/div/div[4]/label[2]/input").click()
        
        print("woke up, ready to show you the code")
        print("code: " + browser.current_url.split("=")[1])
        code = browser.current_url.split("=")[1]
        
        def getToken(self):
            response = requests.get("https://connect.deezer.com/oauth/access_token.php?app_id=413642&secret=67f74807edb8c67309bf48028101aa1a&code={}".format(code) )
            text = response.text
            print("response from get token: {}".format(text))
            split = text.split("=")
            part1 = split[0]
            part2 = split[1] 
            part3 = split[2]
            data ={ str(part1): str(part2 + "=" + part3) }
            sleep(5)
            with open("token.json", "w") as json_file:
                json.dump(data, json_file)
            print("token sent to token.json")
        getToken(self)
        

        
        