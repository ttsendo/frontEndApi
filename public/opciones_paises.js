document.getElementById('pais').addEventListener('change', function() {
  const country = this.value;
  const departmentSelect = document.getElementById('departamento');
  departmentSelect.disabled = true;

  // Borrar opciones existentes
  while (departmentSelect.options.length > 0) {
    departmentSelect.options.remove(0);
  }

  if (country === 'colombia') {
    addDepartmentsToSelect(['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena']);
  } else if (country === 'ecuador') {
    addDepartmentsToSelect(['Quito', 'Guayaquil', 'Cuenca', 'Machala', 'Ambato']);
  } else if (country === 'argentina') {
    addDepartmentsToSelect(['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'San Miguel de Tucumán']);
  } else if (country === 'chile') {
    addDepartmentsToSelect(['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta']);
  } else if (country === 'brasil') {
    addDepartmentsToSelect(['São Paulo', 'Rio de Janeiro', 'Salador', 'Brasília', 'Fortaleza']);
  }
});

function addDepartmentsToSelect(departments) {
  const departmentSelect = document.getElementById('departamento');
  departmentSelect.disabled = false;

  departments.forEach(function(department) {
    const option = document.createElement('option');
    option.value = department.toLowerCase().replace(' ', '-');
    option.text = department;
    departmentSelect.add(option);
  });
}
