import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModal
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'; // Asegúrate de importar el módulo de paginación
import * as XLSX from 'xlsx'; // Asegúrate de importar XLSX


@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [SharedModule, CommonModule, HttpClientModule],
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  filtroForm: FormGroup;

  // Formulario para el modal (nueva empresa)
  empresaForm: FormGroup;

  // Formularios para teléfono y correo
  phoneForm: FormGroup;
  emailForm: FormGroup;
 // Formulario reactivo para el modal
 zonaForm: FormGroup;

 // Zonas que se mostrarán en la tabla
 zonas = [
   { zona: 'Zona 01', estado: 'Activo' },
   { zona: 'Zona 02', estado: 'Inactivo' },
   { zona: 'Zona 03', estado: 'Activo' }
 ];

  // Lista de empresas
  empresas = [
    {
      razonSocial: 'ARQUISOFTWARE SAC',
      ruc: '1074744009',
      representanteLegal: 'CARLOS AIRTON CURO S.',
      fechaRegistro: new Date('1999-11-22'),
      estado: 'ACTIVO'
    },
    {
      razonSocial: 'SOFTWARE INGENIERÍA S.A.C.',
      ruc: '1074744010',
      representanteLegal: 'PEDRO GARCÍA',
      fechaRegistro: new Date('2005-08-15'),
      estado: 'DESACTIVADO'
    },
    {
      razonSocial: 'INNOVATECH PERU',
      ruc: '1074744011',
      representanteLegal: 'MARÍA LÓPEZ',
      fechaRegistro: new Date('2010-02-12'),
      estado: 'ACTIVO'
    },
    {
      razonSocial: 'CONECTADOS S.A.',
      ruc: '1074744012',
      representanteLegal: 'JUAN PÉREZ',
      fechaRegistro: new Date('2015-05-20'),
      estado: 'DESACTIVADO'
    },
    {
      razonSocial: 'TEXNOLOGÍA EXCELENTE',
      ruc: '1074744013',
      representanteLegal: 'ANA PÉREZ',
      fechaRegistro: new Date('2018-11-30'),
      estado: 'ACTIVO'
    },
    {
      razonSocial: 'ALFA Y OMEGA S.A.',
      ruc: '1074744014',
      representanteLegal: 'MARIO FERNÁNDEZ',
      fechaRegistro: new Date('2020-01-18'),
      estado: 'ACTIVO'
    },
    {
      razonSocial: 'PUNTO NET S.A.C.',
      ruc: '1074744015',
      representanteLegal: 'LUIS GÓMEZ',
      fechaRegistro: new Date('2022-03-03'),
      estado: 'DESACTIVADO'
    },
    {
      razonSocial: 'AVANZATECH',
      ruc: '1074744016',
      representanteLegal: 'CAMILA DÍAZ',
      fechaRegistro: new Date('2023-06-28'),
      estado: 'ACTIVO'
    },
    {
      razonSocial: 'GLOBO DIGITAL',
      ruc: '1074744017',
      representanteLegal: 'GUSTAVO RAMIREZ',
      fechaRegistro: new Date('2021-08-11'),
      estado: 'DESACTIVADO'
    },
    {
      razonSocial: 'ELECTRONIC SOLUTIONS',
      ruc: '1074744018',
      representanteLegal: 'JORGE SERRANO',
      fechaRegistro: new Date('2017-07-02'),
      estado: 'ACTIVO'
    }
  ];

  empresasFiltradas = [...this.empresas]; // Se crea una copia inicial de las empresas

  // Variable para determinar el orden de las columnas
  orden: { campo: string, direccion: string } = { campo: '', direccion: 'asc' };

  // Lista de resoluciones (para la tabla)
  resoluciones = [
    {
      nru: '123',
      resolucion: 'R01',
      categoriaMotos: 'Categoria A',
      zona: 'Lima',
      estado: 'Activo',
      fechaRegistro: new Date('2023-01-01'),
      fechaCese: new Date('2023-12-31')
    },
    {
      nru: '124',
      resolucion: 'R02',
      categoriaMotos: 'Categoria B',
      zona: 'Arequipa',
      estado: 'Inactivo',
      fechaRegistro: new Date('2022-05-10'),
      fechaCese: new Date('2023-05-10')
    }
  ];

  resolucionForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal // Usa NgbModal
  ) {
    this.filtroForm = this.fb.group({
      razonSocial: [''],
      ruc: [''],
      estado: ['']
    });

    this.empresaForm = this.fb.group({
      razonSocial: ['', [Validators.required, Validators.maxLength(100)]],
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      representanteLegal: ['', [Validators.required, Validators.maxLength(100)]],
      fechaRegistro: ['', Validators.required],
      estado: ['ACTIVO', Validators.required]
    });
  }
  ngOnInit(): void {
    // Asegúrate de que filtroForm está siendo inicializado
    this.filtroForm = this.fb.group({
      razonSocial: [''],
      ruc: [''],
      estado: ['']
    });
  
    // Asegúrate de que empresaForm también esté inicializado
    this.empresaForm = this.fb.group({
      razonSocial: ['', [Validators.required, Validators.maxLength(100)]],
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      representanteLegal: ['', [Validators.required, Validators.maxLength(100)]],
      fechaRegistro: ['', Validators.required],
      estado: ['ACTIVO', Validators.required]
    });
  }
  // Método para buscar empresas
  buscar(): void {
    const filtros = this.filtroForm.value;
    this.empresasFiltradas = this.empresas.filter((empresa) => {
      return (
        (!filtros.razonSocial || empresa.razonSocial.toLowerCase().includes(filtros.razonSocial.toLowerCase())) &&
        (!filtros.ruc || empresa.ruc.includes(filtros.ruc)) &&
        (!filtros.estado || empresa.estado === filtros.estado)
      );
    });
  }

  open(modalRef: any) {
    this.modalService.open(modalRef, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl', // Extra grande
      backdrop: 'static'
    }).result.then(
      (result) => {
        console.log(`Modal cerrado con: ${result}`);
      },
      (reason) => {
        console.log(`Modal cerrado por: ${reason}`);
      }
    );
  }
  
  openlg(modalRef: any) {
    this.modalService.open(modalRef, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg', // Extra grande
      backdrop: 'static'
    }).result.then(
      (result) => {
        console.log(`Modal cerrado con: ${result}`);
      },
      (reason) => {
        console.log(`Modal cerrado por: ${reason}`);
      }
    );
  }
  // Método para guardar los datos del formulario del modal
  guardar(): void {
    if (this.empresaForm.valid) {
      const nuevaEmpresa = this.empresaForm.value;
      this.empresas.push({
        ...nuevaEmpresa,
        fechaRegistro: new Date(nuevaEmpresa.fechaRegistro)
      });
      this.empresasFiltradas = [...this.empresas]; // Actualizamos la tabla
      this.modalService.dismissAll(); // Cerrar modal
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  // Método para ordenar las columnas
  ordenarPor(campo: string): void {
    const direccion = this.orden.campo === campo && this.orden.direccion === 'asc' ? 'desc' : 'asc';
    this.orden = { campo, direccion };

    this.empresasFiltradas.sort((a, b) => {
      const valorA = a[campo];
      const valorB = b[campo];

      // Para cadenas, usamos localeCompare, para números usamos comparación directa
      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return direccion === 'asc' 
          ? valorA.localeCompare(valorB) 
          : valorB.localeCompare(valorA);
      } else {
        return direccion === 'asc' ? valorA - valorB : valorB - valorA;
      }
    });
  }
  
}