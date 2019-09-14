import java.util.HashMap;
import java.util.Map;

class Produtos {
    private HashMap<String, Integer> inventario = new HashMap<String, Integer>();
    public Produtos() {
        inventario.put("Disp 1", 3);
        inventario.put("Disp 2", 5);
        inventario.put("Disp 3", 2);
        inventario.put("Disp 4", 6);
    }
    String pesquisar (String prod) {
        if (inventario.get(prod) != null) {
            return "Dispositivo disponivel";
        } else {
            return "Dispositivo não disponivel";
        }
    }
    Integer estoque(String prod) {
        Integer estoque = inventario.get(prod);
        if (estoque != null) {
            return estoque;
        } else {
            return 0;
        }
    }
}
