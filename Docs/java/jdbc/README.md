## Getting Started

Welcome to the VS Code Java world. Here is a guideline to help you get started to write Java code in Visual Studio Code.

## Folder Structure

The workspace contains two folders by default, where:

- `src`: the folder to maintain sources
- `lib`: the folder to maintain dependencies

Meanwhile, the compiled output files will be generated in the `bin` folder by default.

> If you want to customize the folder structure, open `.vscode/settings.json` and update the related settings there.

## Dependency Management

The `JAVA PROJECTS` view allows you to manage your dependencies. More details can be found [here](https://github.com/microsoft/vscode-java-dependency#manage-dependencies).


## Mariadb Connector/J
+ [Download ](https://mariadb.com/kb/en/about-mariadb-connector-j/)
+ [Java version Driver](https://mariadb.com/downloads/connectors/connectors-data-access/java8-connector)

## Java Project Folder
- `src`
    - `java files`
- `lib`
    - `jar files`
- `bin`
    - `class files`

## main method file
```java
public static void main(String[] args) {
    String driver = "org.mariadb.jdbc.Driver";
    try {
        System.out.println("JDBC Start!");
        Class.forName(driver);
    } catch (ClassNotFoundException e) {

    } catch (Exception e) {
        e.printStackTrace();
    } 
}
```
+ `Class.forName` : 대상 클래스 여부 확인 
    + 동적 클래스 로딩
    + JDBC 드라이버 로딩
    + Reflection 실행
    + JDBC 4.0 부터 자동 클래스 로딩 추가 (JDK 1.6 도입)

