import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import moment from "moment";
import Header from ".";

describe("Header", () => {
  const date = new Date();
  const onClickNext = jest.fn();
  const onClickPrevious = jest.fn();
  const onSetDate = jest.fn();

  test("renders the date correctly", () => {
    render(
      <Header
        date={date}
        setDate={onSetDate}
        nextDisabled={false}
        prevDisabled={false}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
      />
    );

    expect(screen.getByText(`${moment(date).format("MMMM")} ${date.getFullYear()}`)).toBeInTheDocument();
  });

  test("calls onClickNext when next button is clicked", () => {
    render(
      <Header
        date={date}
        setDate={onSetDate}
        nextDisabled={false}
        prevDisabled={false}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
      />
    );

    fireEvent.click(screen.getByTestId("test-next-month"));

    expect(onClickNext).toHaveBeenCalled();
  });

  test("calls onClickPrevious when previous button is clicked", () => {
    render(
      <Header
        date={date}
        setDate={onSetDate}
        nextDisabled={false}
        prevDisabled={false}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
      />
    );

    fireEvent.click(screen.getByTestId("test-prev-month"));

    expect(onClickPrevious).toHaveBeenCalled();
  });

  test("disables the next button when nextDisabled is true", () => {
    render(
      <Header
        date={date}
        setDate={onSetDate}
        nextDisabled={true}
        prevDisabled={false}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
      />
    );

    expect(screen.getByTestId("test-next-month")).toBeDisabled();
  });

  test("disables the previous button when prevDisabled is true", () => {
    render(
      <Header
        date={date}
        setDate={onSetDate}
        nextDisabled={false}
        prevDisabled={true}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
      />
    );

    expect(screen.getByTestId("test-prev-month")).toBeDisabled();
  });
});
