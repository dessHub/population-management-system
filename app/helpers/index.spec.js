import { validatePhoneNumber, validateSms, validateContacts } from './index';

describe("Test helper functions", () => {
  test("phone number should be integer and 10 characters", () => {
    expect(validatePhoneNumber("0792777888")).toBe(true);
  });

  test("validate that sender is required when creating an sms", () => {
    const body = {
      "receiver": "0792777888",
      "message": "test message"
    };
    expect(validateSms(body).sender).toBe("error, sender is required");
  })
  
  test("validate that receiver is required when creating an sms", () => {
    const body = {
      "sender": "0792777888",
      "message": "test message"
    };
    expect(validateSms(body).receiver).toBe("error, receiver is required");
  })

  test("validate that message is required when creating an sms", () => {
    const body = {
      "receiver": "0792777888",
      "sender": "0792888777"
    };
    expect(validateSms(body).message).toBe("error, message is required");
  })

  test("validate that phone_number is required when creating a contact", () => {
    const body = {
      "name": "test"
    };
    expect(validateContacts(body).phone_number).toBe("error, phone_number is required");
  })
})
