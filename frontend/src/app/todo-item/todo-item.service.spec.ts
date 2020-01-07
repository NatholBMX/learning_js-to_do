import { TestBed } from "@angular/core/testing";

import { TodoItemService } from "./todo-item.service";

describe("TodoItemService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TodoItemService = TestBed.get(TodoItemService);
    expect(service).toBeTruthy();
  });
});
