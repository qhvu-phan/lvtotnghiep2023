# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

import datetime as dt 
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

import datetime as dt 
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import mysql.connector
from rasa_sdk.events import Restarted
from PIL import Image
import io

class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_show_time"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            
        now = dt.datetime.now()
        day_of_week = now.strftime("%A")
        
        # Chuyển đổi tên thứ tiếng Anh sang tiếng Việt
        if day_of_week == "Monday":
            day_of_week = "Thứ 2"
        elif day_of_week == "Tuesday":
            day_of_week = "Thứ 3"
        elif day_of_week == "Wednesday":
            day_of_week = "Thứ 4"
        elif day_of_week == "Thursday":
            day_of_week = "Thứ 5"
        elif day_of_week == "Friday":
            day_of_week = "Thứ 6"
        elif day_of_week == "Saturday":
            day_of_week = "Thứ 7"
        elif day_of_week == "Sunday":
            day_of_week = "Chủ nhật"
        
        date = now.strftime("%d")
        
        # Chuyển đổi định dạng tháng tiếng Anh sang tiếng Việt
        month = now.strftime("%B")
        if month == "January":
            month = "tháng 1"
        elif month == "February":
            month = "tháng 2"
        elif month == "March":
            month = "tháng 3"
        elif month == "April":
            month = "tháng 4"
        elif month == "May":
            month = "tháng 5"
        elif month == "June":
            month = "tháng 6"
        elif month == "July":
            month = "tháng 7"
        elif month == "August":
            month = "tháng 8"
        elif month == "September":
            month = "tháng 9"
        elif month == "October":
            month = "tháng 10"
        elif month == "November":
            month = "tháng 11"
        elif month == "December":
            month = "tháng 12"
            
        year = now.strftime("%Y")
        time = now.strftime("%H:%M:%S")

        response = f"Hôm nay là {day_of_week}, ngày {date}, {month}, năm {year}, lúc {time}"
        dispatcher.utter_message(text=response)

        return []
    
class ActionGreet(Action):
    def name(self) -> Text:
        return "action_greet"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message("Xin chào! Tôi là chatbot. Tôi có thể giúp gì cho bạn?")
        return []
    
class QueryProduct(Action):    
    def name(self) -> Text:
        return "action_query_product"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Kết nối đến cơ sở dữ liệu
        cnx = mysql.connector.connect(user='root', password='', host='localhost', database='bachhoachangsen')
        cursor = cnx.cursor()

        # Truy vấn cơ sở dữ liệu
        query = "SELECT p.id, p.pro_name, p.pro_price, i.image_path FROM product p JOIN image i ON p.id = i.id"
        cursor.execute(query)

        # Xử lý kết quả truy vấn
        results = cursor.fetchall()
        for row in results:
            product_id = row[0]
            product_name = row[1]
            product_price = row[2]
            image_path = row[3]

            # Hiển thị kết quả truy vấn
            dispatcher.utter_message(text="ID sản phẩm: {}, Tên sản phẩm: {}, Giá: {} VNĐ, Hình ảnh: {}".format(product_id, product_name, product_price, image_path ))

        # Đóng kết nối đến cơ sở dữ liệu
        cursor.close()
        cnx.close()

        return []
    
