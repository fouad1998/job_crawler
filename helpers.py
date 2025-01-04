import json

import pyperclip
from bs4 import BeautifulSoup


def get_clipboard_text():
    """
    Retrieve the current text from the clipboard.

    Returns:
        str: Text content of the clipboard.
    """
    try:
        text = pyperclip.paste()  # Retrieve text from clipboard
        return text
    except Exception as error:
        print("Error accessing clipboard:", error)
        return ""



def remove_markers(text, markers):
    """
    Remove specific markers from the given string.

    Args:
        text (str): Input string.
        markers (list): List of markers to remove.

    Returns:
        str: The string with markers removed.
    """
    for marker in markers:
        text = text.replace(marker, "")
        
    return text

def parse_json(json_string):
    """
    Parse a JSON string into a Python dictionary or list.

    Args:
        json_string (str): A valid JSON string.

    Returns:
        dict or list: Parsed Python object (dictionary or list) from the JSON.
    """
    try:
        parsed_data = json.loads(json_string)
        return parsed_data
    except json.JSONDecodeError as error:
        print("Error parsing JSON:", error)
        return None

def html_to_formatted_text(html_content):
    """
    Convert HTML content to formatted plain text.

    Args:
        html_content (str): The HTML content as a string.

    Returns:
        str: The plain text content, formatted as needed.
    """
    try:
        # Parse the HTML content
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Extract plain text
        plain_text = soup.get_text(separator='\n')  # Separate block elements with newlines
        
        # Optionally, clean up excess whitespace
        formatted_text = "\n".join(line.strip() for line in plain_text.splitlines() if line.strip())
        
        return formatted_text
    except Exception as error:
        print("Error converting HTML to text:", error)
        return ""