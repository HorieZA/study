import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    
    // String a = "안녕하세요";
    // boolean b = true;
    // System.out.println(a + b);
    // List<Integer> list = new ArrayList<>();
    
    // for(int i = 0; i < 5; i++) {
    //   list.add(i); // 0, 1, 2, 3, 4
    // }
      
    //   System.out.println(list.get(3));
    int a;
    // a = new A().getA();
    a = new A(1).getA();
  
    System.out.println(new A());
  }

}

class A {
  int a;
  public A() {}
  public A(int a){ this.a = a; }  

  int getA() {
    return this.a;
  }
  @Override
  public String toString(){
    return "A Class 입니다.";
  }
}