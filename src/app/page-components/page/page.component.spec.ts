import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { PageService } from '../../services/page/page.service';
import { BreadcrumbsService } from '../../services/breadcrubs/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SimpleEntity } from '../../entities/SimpleEntity';
import { Page } from '../../entities/Page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let pageServiceSpy: jasmine.SpyObj<PageService>;
  let breadcrumbsServiceSpy: jasmine.SpyObj<BreadcrumbsService>;
  let route: ActivatedRoute;

  beforeEach(() => {
    const pageService = jasmine.createSpyObj('PageService', ['loadPageByPath', 'get']);
    const breadcrumbsService = jasmine.createSpyObj('BreadcrumbsService', ['changeBreadcrumbs']);

    TestBed.configureTestingModule({
      imports: [PageComponent, HttpClientTestingModule],
      providers: [
        { provide: PageService, useValue: pageService },
        { provide: BreadcrumbsService, useValue: breadcrumbsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => (key === 'category' ? 'category-1' : 'path-1') } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    pageServiceSpy = TestBed.inject(PageService) as jasmine.SpyObj<PageService>;
    breadcrumbsServiceSpy = TestBed.inject(BreadcrumbsService) as jasmine.SpyObj<BreadcrumbsService>;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the page correctly with category and path', () => {
    // Arrange
    const mockPage = new Page(1, 'Test Page', new SimpleEntity(1, 'Author'), new Date(), 'Content', 'BBContent');
    pageServiceSpy.get.and.returnValue(of(mockPage));
    component.page$ = of(mockPage);

    // Act
    component.ngOnInit();

    // Assert
    expect(pageServiceSpy.loadPageByPath).toHaveBeenCalledWith('category-1/path-1');
    expect(component.page$).toBeTruthy();
    expect(breadcrumbsServiceSpy.changeBreadcrumbs).toHaveBeenCalledWith('page', ['category-1', 'path-1']);
  });

  it('should load the page correctly with path only (no category)', () => {
    // Arrange
    const mockPage = new Page(1, 'Test Page', new SimpleEntity(1, 'Author'), new Date(), 'Content', 'BBContent');
    pageServiceSpy.get.and.returnValue(of(mockPage));
    component.page$ = of(mockPage);

    // Simulate route parameters for no category
    route.snapshot.paramMap.get = jasmine.createSpy().and.returnValues(null, 'path-1')

    // Act
    component.ngOnInit();

    // Assert
    expect(pageServiceSpy.loadPageByPath).toHaveBeenCalledWith('path-1');
    expect(component.page$).toBeTruthy();
    expect(breadcrumbsServiceSpy.changeBreadcrumbs).toHaveBeenCalledWith('page', [null, 'path-1']);
  });

  it('should handle null page and not call breadcrumbsService', () => {
    // Arrange
    pageServiceSpy.get.and.returnValue(of(null));
    component.page$ = of(null);

    // Act
    component.ngOnInit();

    // Assert
    expect(pageServiceSpy.loadPageByPath).toHaveBeenCalled();
    expect(breadcrumbsServiceSpy.changeBreadcrumbs).not.toHaveBeenCalled();
  });

  it('should handle the case when no route parameters are provided', () => {
    // Arrange
    const mockPage = new Page(1, 'Test Page', new SimpleEntity(1, 'Author'), new Date(), 'Content', 'BBContent');
    pageServiceSpy.get.and.returnValue(of(mockPage));
    route.snapshot.paramMap.get = jasmine.createSpy().and.returnValue(null);

    // Act
    component.ngOnInit();

    // Assert
    expect(pageServiceSpy.loadPageByPath).toHaveBeenCalledWith('404');
    expect(breadcrumbsServiceSpy.changeBreadcrumbs).toHaveBeenCalledWith('page', [null, null]);
  });
});
