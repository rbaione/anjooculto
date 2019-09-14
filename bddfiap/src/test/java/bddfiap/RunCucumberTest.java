package bddfiap;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty"},tags= {"@verificar_disponibilidade_produto"})
public class RunCucumberTest {
}
