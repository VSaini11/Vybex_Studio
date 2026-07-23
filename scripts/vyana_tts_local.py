import sys
import json
import os
from gtts import gTTS

def main():
    try:
        raw_input = sys.stdin.read()
        if not raw_input:
            print(json.dumps({"error": "No input provided"}))
            return
        
        data = json.loads(raw_input)
        text = data.get("text", "")
        output_path = data.get("output_path", "public/generated_vyana.mp3")
        
        if not text:
            print(json.dumps({"error": "No text provided"}))
            return

        # Generate audio locally using gTTS female voice model engine
        # Detect if Hindi characters exist in text
        is_hindi = any('\u0900' <= char <= '\u097F' for char in text)
        lang = 'hi' if is_hindi else 'en'
        
        tts = gTTS(text=text, lang=lang, slow=False)
        tts.save(output_path)
        
        print(json.dumps({
            "status": "success",
            "text": text,
            "output_path": "/" + os.path.basename(output_path)
        }))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
