import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class Test {
    String name;
    LocalDate date;

    public Test(String name, LocalDate date) {
        this.name = name;
        this.date = date;
    }

    @Override
    public String toString() {
        return "Test{" +
                "name='" + name + '\'' +
                ", date=" + date +
                '}';
    }
}

public class Main {
    public static void main(String[] args) {
        List<Test> Tests = Arrays.asList(
                new Test("Test A", LocalDate.of(2022, 1, 15)),
                new Test("Test B", LocalDate.of(2022, 2, 20)),
                new Test("Test C", LocalDate.of(2022, 3, 25)),
                new Test("Test D", LocalDate.of(2022, 4, 30))
        );

        LocalDate searchDate = LocalDate.of(2022, 3, 1);

        List<Test> filteredTests = Tests.stream()
                .filter(Test -> Test.date.isAfter(searchDate) || Test.date.isEqual(searchDate))
                .collect(Collectors.toList());

        System.out.println("Danh sách sự kiện sau ngày " + searchDate + ": " + filteredTests);
    }
}

