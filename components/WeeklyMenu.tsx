
import React, { useState, useRef } from 'react';
import PDFViewer from './PDFViewer';
import { UserProfile, UserRole } from '../types';

interface WeeklyMenuProps {
  user: UserProfile;
}

interface MenuItem {
    day: string;
    date: string;
    main: string;
    soup: string;
    side: string[];
    kcal: number;
    type: string;
}

const WeeklyMenu: React.FC<WeeklyMenuProps> = ({ user }) => {
  const initialMenu: MenuItem[] = [
    { day: '월', date: '02/10', main: '소불고기 덮밥', soup: '콩나물국', side: ['계란말이', '배추김치', '과일샐러드'], kcal: 850, type: 'A코스' },
    { day: '화', date: '02/11', main: '치즈 돈까스', soup: '크림스프', side: ['마카로니', '깍두기', '피클'], kcal: 920, type: 'A코스' },
    { day: '수', date: '02/12', main: '해물 된장찌개', soup: '잡곡밥', side: ['고등어구이', '시금치나물', '열무김치'], kcal: 780, type: 'A코스' },
    { day: '목', date: '02/13', main: '짜장면 & 탕수육', soup: '짬뽕국물', side: ['단무지', '군만두', '짜사이'], kcal: 1100, type: 'A코스' },
    { day: '금', date: '02/14', main: '비빔밥', soup: '미소장국', side: ['약고추장', '백김치', '요구르트'], kcal: 650, type: 'A코스' },
  ];

  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isAdmin = user.role === UserRole.ADMIN;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
        setIsUploading(false);
        alert("식단표 PDF 파일이 업로드되었습니다.");
        setShowPDF(true); 
    }, 1500);
  };

  const handleUpdateMenu = (index: number, field: keyof MenuItem, value: any) => {
      const newMenu = [...menu];
      newMenu[index] = { ...newMenu[index], [field]: value };
      setMenu(newMenu);
  };

  const handleUpdateSide = (menuIndex: number, sideIndex: number, value: string) => {
      const newMenu = [...menu];
      const newSides = [...newMenu[menuIndex].side];
      newSides[sideIndex] = value;
      newMenu[menuIndex].side = newSides;
      setMenu(newMenu);
  };

  const handleSave = () => {
      setIsEditing(false);
      alert('식단 정보가 저장되었습니다.');
  };

  return (
    <div className="p-6 lg:p-10 bg-slate-50 dark:bg-slate-950 min-h-full overflow-y-auto transition-colors duration-300">
       
       {showPDF && (
         <PDFViewer 
            title="2025년 2월 2주차 주간 식단표.pdf" 
            onClose={() => setShowPDF(false)} 
            user={user}
            type="IMAGE"
         />
       )}

       <div className="max-w-6xl mx-auto">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">금주의 식단</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">한일후지코리아 사내 식당 주간 메뉴입니다.</p>
            </div>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => setShowPDF(true)}
                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    이미지 보기
                </button>

                {isAdmin && (
                    <>
                        <input type="file" accept=".pdf,.jpg,.png" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                            {isUploading ? '업로드...' : '이미지 교체'}
                        </button>
                        <button 
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-800 hover:bg-slate-700'}`}
                        >
                            {isEditing ? '저장 완료' : '식단 편집'}
                        </button>
                    </>
                )}
            </div>
         </div>

         {/* Week Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {menu.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all group">
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                        <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">{item.day}요일 ({item.date})</span>
                        <span className="text-xs font-medium px-2 py-0.5 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300">{item.type}</span>
                    </div>
                    <div className="p-4">
                        <div className="h-32 flex items-center justify-center mb-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 overflow-hidden relative">
                            <svg className="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            <span className="absolute bottom-2 right-2 text-[10px] text-slate-400 dark:text-slate-500">이미지 준비중</span>
                        </div>
                        
                        {isEditing ? (
                            <div className="space-y-2">
                                <input 
                                    className="w-full p-1 text-sm font-bold border rounded bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-600"
                                    value={item.main} 
                                    onChange={(e) => handleUpdateMenu(idx, 'main', e.target.value)}
                                />
                                <input 
                                    className="w-full p-1 text-sm text-slate-500 border rounded bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
                                    value={item.soup} 
                                    onChange={(e) => handleUpdateMenu(idx, 'soup', e.target.value)}
                                    placeholder="국/스프"
                                />
                                <div className="space-y-1">
                                    {item.side.map((s, sIdx) => (
                                        <input 
                                            key={sIdx}
                                            className="w-full p-1 text-xs text-slate-600 border rounded bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
                                            value={s} 
                                            onChange={(e) => handleUpdateSide(idx, sIdx, e.target.value)}
                                        />
                                    ))}
                                </div>
                                <input 
                                    type="number"
                                    className="w-full p-1 text-xs text-right border rounded bg-slate-50 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600"
                                    value={item.kcal} 
                                    onChange={(e) => handleUpdateMenu(idx, 'kcal', e.target.value)}
                                />
                            </div>
                        ) : (
                            <>
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{item.main}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{item.soup}</p>
                                
                                <div className="space-y-1 mb-4">
                                    {item.side.map((s, i) => (
                                        <p key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
                                            {s}
                                        </p>
                                    ))}
                                </div>
                                
                                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-right">
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{item.kcal} Kcal</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
         </div>
         
         <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200 flex gap-3 items-start transition-colors">
             <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
             <div>
                 <p className="font-bold mb-1">알레르기 정보 안내</p>
                 <p>식단 내 알레르기 유발 물질(난류, 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토 등)이 포함될 수 있으니 특이체질인 경우 반드시 섭취 전 확인 바랍니다.</p>
             </div>
         </div>
       </div>
    </div>
  );
};

export default WeeklyMenu;
