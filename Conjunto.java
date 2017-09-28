import java.util.ArrayList;

public class Conjunto {
	private final ArrayList<Integer> elements = new ArrayList<Integer>();

	public void addElement(int e){
		if(!this.elements.contains(e))
			elements.add(e);
	}
	public boolean contains(int e){
		boolean result  = false;
		for (int i = 0; i < this.elements.size() && !result; i++)
			if(this.elements.get(i) == e) result = true;
		return result;
	}
	public Conjunto union(Conjunto conjunto){
		Conjunto result = new Conjunto();

		for (Integer i: this.elements)
			result.addElement(i);

		for (Integer i: this.conjunto.getElements())
			result.addElement(i);

		return result;
	}
}
