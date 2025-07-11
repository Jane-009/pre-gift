import requests
import sys
import json
from datetime import datetime
import uuid
import os

class MagicalGiftAPITester:
    def __init__(self, base_url="https://c0fac1b2-8465-4243-aaba-5c91a2a0e90d.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {}
        
        if not files:
            headers['Content-Type'] = 'application/json'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                if files:
                    response = requests.post(url, data=data, files=files, timeout=10)
                else:
                    response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2, default=str)}")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.test_results.append({
                'name': name,
                'success': success,
                'status_code': response.status_code,
                'expected_status': expected_status
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                'name': name,
                'success': False,
                'error': str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_password_verification_correct(self):
        """Test password verification with correct password"""
        return self.run_test(
            "Password Verification (Correct)",
            "POST",
            "api/verify-password",
            200,
            data={"password": "LET ME IN"}
        )

    def test_password_verification_incorrect(self):
        """Test password verification with incorrect password"""
        return self.run_test(
            "Password Verification (Incorrect)",
            "POST",
            "api/verify-password",
            200,
            data={"password": "wrong password"}
        )

    def test_password_verification_case_sensitive(self):
        """Test password verification case sensitivity"""
        return self.run_test(
            "Password Verification (Case Sensitive)",
            "POST",
            "api/verify-password",
            200,
            data={"password": "let me in"}
        )

    def test_save_message(self):
        """Test saving a message"""
        message_data = {
            "id": str(uuid.uuid4()),
            "content": "This is a test message for the magical realm",
            "section": "test_section",
            "created_date": datetime.now().isoformat()
        }
        return self.run_test(
            "Save Message",
            "POST",
            "api/save-message",
            200,
            data=message_data
        )

    def test_get_messages_by_section(self):
        """Test retrieving messages by section"""
        return self.run_test(
            "Get Messages by Section",
            "GET",
            "api/messages/test_section",
            200
        )

    def test_get_all_photos(self):
        """Test retrieving all photos"""
        return self.run_test(
            "Get All Photos",
            "GET",
            "api/photos",
            200
        )

    def test_get_photos_by_section(self):
        """Test retrieving photos by section"""
        return self.run_test(
            "Get Photos by Section",
            "GET",
            "api/photos/gallery",
            200
        )

    def test_photo_upload(self):
        """Test photo upload functionality"""
        # Create a simple test image file in memory
        test_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\nIDATx\x9cc\xf8\x00\x00\x00\x01\x00\x01\x00\x00\x00\x00IEND\xaeB`\x82'
        
        files = {
            'file': ('test_image.png', test_image_content, 'image/png')
        }
        data = {
            'section': 'gallery',
            'description': 'Test image upload'
        }
        
        return self.run_test(
            "Photo Upload",
            "POST",
            "api/upload-photo",
            200,
            data=data,
            files=files
        )

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*50}")
        print(f"📊 TEST SUMMARY")
        print(f"{'='*50}")
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_run - self.tests_passed > 0:
            print(f"\n❌ Failed Tests:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   - {result['name']}")
                    if 'error' in result:
                        print(f"     Error: {result['error']}")
                    elif 'status_code' in result:
                        print(f"     Got {result['status_code']}, expected {result['expected_status']}")

def main():
    print("🧙‍♂️ Starting Magical Gift API Testing...")
    print("=" * 50)
    
    tester = MagicalGiftAPITester()
    
    # Run all tests
    print("\n🔍 Running Backend API Tests...")
    
    # Basic health check
    tester.test_health_check()
    
    # Password verification tests
    tester.test_password_verification_correct()
    tester.test_password_verification_incorrect()
    tester.test_password_verification_case_sensitive()
    
    # Message functionality tests
    tester.test_save_message()
    tester.test_get_messages_by_section()
    
    # Photo functionality tests
    tester.test_get_all_photos()
    tester.test_get_photos_by_section()
    tester.test_photo_upload()
    
    # Print final summary
    tester.print_summary()
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())