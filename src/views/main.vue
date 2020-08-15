<template>
  <html>
    <head>
      <base target="_blank">
      <title>Main</title>
    </head>
    <body>
      <div style="height:100%;width:100%">
        <el-scrollbar style="height:100%;with:100%">
          <el-container>
            <el-header>
              <font size="5" color="white" style="height:60px;float:left;margin-left:20px;margin-top:10px;margin-bottom:0px">
                订阅
              </font>
              <el-dropdown  trigger="click" class="drop-down-i" >
                <span class="el-dropdown-link" style="font-size:17px;color:white">
                <i class="el-icon-user"></i>
                  {{this.$route.query.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item><i class="el-icon-plus"  @click="quit()">退出</i></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-header>
            <el-main>
              <el-tabs v-model="activeName" type="card">
                  <!--下面是分页管理 -->
                  <el-tab-pane label="主题订阅" name="first">
                    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                      <div style="float:right;margin-right:20px;letter-spacing:2px;margin-bottom:10px">
                        <font size="4" color="black" >
                          <i class="el-icon-plus" style="cursor:pointer" @click="openthmeadd('theme')"></i>
                          <i class="el-icon-setting"></i>
                          <i class="el-icon-more"></i>
                        </font>
                      </div>
                      <el-table
                            :data="tableData_Theme.slice(pagesize_theme*(currentpage_theme-1),pagesize_theme*currentpage_theme)"
                            style="width: 100%;"
                            align="center"
                            show-overflow-tootip="false"
                            @row-click="show_theme_new"
                            highlight-current-row
                            >
                            <el-table-column
                                prop="SubscriptionID"
                                label="订阅ID"
                                width="180"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="Subject"
                                label="订阅主题"
                                width="180"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="Keyword"
                                label="关键词"
                                align="center">
                                <!-- <template slot-scope="scope"> -->
                                  <!-- <div v-for="item in tableData_Theme[scope.$index].subkeyword" :key=item>
                                    <el-tag type="success">{{item}}</el-tag>
                                  </div> -->
                                  <!-- <el-tag type="success">{{tableData_Theme[scope.$index].Keyword}}</el-tag> -->
                                <!-- </template> -->
                            </el-table-column>
                            <el-table-column
                                prop="Frequency"
                                label="频率"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="SetTime"
                                label="查询时间"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="ReturnType"
                                label="结果类型"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="func"
                                label="操作"
                                align="center">
                                <template slot-scope="scope">
                                  <font size="4" color="black">
                                  <i class="el-icon-delete" style="cursor:pointer" @click="delete_row('theme',scope.$index, tableData_Theme)"></i>
                                  <i class="el-icon-edit" style="cursor:pointer"  @click="edit_row('theme',scope.$index, tableData_Theme)"></i>
                                  </font>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="nus"
                                label="阅读状态"
                                align="center">
                                <template slot-scope="scope">
                                  <i class="el-icon-reading">
                                    <el-badge :value="tableData_Theme[scope.$index].readstatus" :max="99" class="item"/>
                                  </i>
                                </template>
                            </el-table-column> -->
                      </el-table>
                      <br>
                      <div style="height:40px;width:100%;text-align:center">
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="tableData_Theme.length"
                        :page-size="pagesize_theme"
                        :current-page="currentpage_theme"
                        @current-change="handlecurrentchange_theme"
                        >
                        </el-pagination>
                      </div>
                      <br>
                    </div>
                    <br>
                    <div >
                      <i class="el-icon-info">订阅结果集信息</i>
                    </div>
                    <br>
                    <div :style="{'display': first_show_foot}" class="ztdy_foot_show">
                      <div style="width:100%;height:30px;background-color:rgb(138, 184, 243);align:center;" >
                        <div style="float:left;"><el-button size="mini" @click="check">标记为已读</el-button></div>
                        <div style="float:right;">
                          <a>{{ztdy_foot_page}}/{{ztdy_all_page}}页</a>
                          <el-button size="mini" icon="el-icon-arrow-left" @click="pageupzt" :disabled="ztupdisabled">上一页</el-button>
                          <el-button size="mini"  @click="pagedownzt" :disabled="ztdowndisabled">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                        </div>
                      </div>
                      <table id="zt_table" border="1px" bordercolor="#DDDDDD" style="margin:auto;border-collapse:collapse;width:100%;line-height:42px;">
                        <tr>
                          <th style="width:10%"><input @change="SelectAll" type="checkbox" name="zt" ></th>
                          <th style="width:80%">主题</th>
                          <th style="width:100%">时间</th>
                        </tr>
                        <template v-if="ztdy_today.length > 0">
                          <tr>
                            <td style="border-bottom:5px solid gray">今天</td>
                            <td style="border-bottom:5px solid gray"></td>
                            <td style="border-bottom:5px solid gray"></td>
                          </tr>
                          <tr v-for="row in ztdy_today.slice((ztdy_foot_page-1)*25,(ztdy_foot_page)*25)" :label="row.Id" :key="row.Id">
                            <template  v-if="row.ReadMark == 'False'" style="border-left:0px;border-top:0px;border-right:0px;">
                              <td><input type="checkbox" :id="row.Id" name="zt" @change="checkboxHandle($event, row.SubscriptionId, row.Id)"></td>
                              <td><a style="font-weight:bold;color:black;" :href="row.Url" @click="havareadrow_ztdy(row.Id)">{{row.Title.substring(0,20)}}</a>
                              <font size="1" color="grey">{{row.Content.substring(0,35)}}</font></td>
                              <td style="font-weight:bold">{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                            <template  v-else>
                              <td><input type="checkbox" :id="row.Id" name="zt" @change="checkboxHandle($event, row.SubscriptionId,row.Id)"></td>
                              <td><a :href="row.Url" style="color:black;">{{row.Title.substring(0,20)}}</a>
                              <font size="1" color="grey">{{row.Content.substring(0,35)}}</font></td>
                              <td>{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                          </tr>
                        </template>
                        <template v-if="ztdy_today.length < 25*ztdy_foot_page && ztdy_week.length > 0 && ztdy_foot_page_list_week < ztdy_week.length">
                          <tr>
                            <td style="border-bottom:5px solid gray">七天内</td>
                            <td style="border-bottom:5px solid gray"></td>
                            <td style="border-bottom:5px solid gray"></td>
                          </tr>
                          <tr v-for="row in ztdy_week.slice(ztdy_foot_page_list_week,25*ztdy_foot_page-ztdy_today.length)" :label="row.Id" :key="row.Id">
                            <template  v-if="row.ReadMark == 'False'">
                              <td><input type="checkbox" :id="row.Id" name="zt" @change="checkboxHandle($event, row.SubscriptionId, row.Id)"></td>
                              <td><a style="font-weight:bold;color:black;" :href="row.Url" @click="havareadrow_ztdy(row.Id)">{{row.Title.substring(0,20)}}</a>
                              <font size="1" color="grey">{{row.Content.substring(0,35)}}</font></td>
                              <td style="font-weight:bold">{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                            <template  v-else>
                              <td><input type="checkbox" :id="row.Id" name="zt" @change="checkboxHandle($event, row.SubscriptionId, row.Id)"></td>
                              <td><a :href="row.Url" style="color:black;">{{row.Title.substring(0,20)}}</a>
                              <font size="1" color="grey">{{row.Content.substring(0,35)}}</font></td>
                              <td>{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                          </tr>
                        </template>
                        <template v-if="(ztdy_today.length+ztdy_week.length) < 25*ztdy_foot_page && ztdy_longer.length > 0">
                          <tr>
                            <td style="border-bottom:5px solid gray">更早</td>
                            <td style="border-bottom:5px solid gray"></td>
                            <td style="border-bottom:5px solid gray"></td>
                          </tr>
                          <tr v-for="row in ztdy_longer.slice(ztdy_foot_page_list_longer,25*ztdy_foot_page-(ztdy_today.length+ztdy_week.length))" :label="row.Id" :key="row.Id">
                            <template  v-if="row.ReadMark == 'False'">
                              <td><input type="checkbox" :id="row.Id" name="zt" @change="checkboxHandle($event, row.SubscriptionId, row.Id)"></td>
                              <td><a style="font-weight:bold;color:black;" :href="row.Url" @click="havareadrow_ztdy(row.Id)">{{row.Title.substring(0,20)}}</a>
                              <font size="1" color="grey">{{row.Content.substring(0,35)}}</font></td>
                              <td style="font-weight:bold">{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                            <template  v-else>
                              <td><input type="checkbox" :id="row.Id" name="zt" @change="checkboxHandle($event, row.SubscriptionId, row.Id)"></td>
                              <td><a :href="row.Url" style="color:black;">{{row.Title.substring(0,20)}}</a>
                              <font size="1" color="grey">{{row.Content.substring(0,35)}}</font></td>
                              <td>{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                          </tr>
                        </template>
                      </table>
                    </div>
                    <div :style="{'display': first_show_foot_other}">
                      <div class="foot_for_text" style="width:100%;text-align:center">
                        <div style="margin:auto">
                          <font size="4" color="black">
                            <a style="align:center;">当前订阅结果集为空</a>
                          </font>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="热点订阅" name="second">
                    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                      <div style="float:right;margin-right:20px;letter-spacing:2px;margin-bottom:10px">
                        <font size="4" color="black" >
                          <i class="el-icon-plus" style="cursor:pointer" @click="openthmeadd('word')"></i>
                          <i class="el-icon-setting"></i>
                          <i class="el-icon-more"></i>
                        </font>
                      </div>
                      <el-table
                            :data="tableData_WordCount.slice(pagesize_word*(currentpage_word-1),pagesize_word*currentpage_word)"
                            style="width: 100%;text-align:center;"
                            align="center"
                            @row-click="show_word_new"
                            highlight-current-row>
                            <el-table-column
                                prop="SubscriptionID"
                                label="订阅ID"
                                width="180"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="Subject"
                                label="订阅主题"
                                width="180"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="Url"
                                label="订阅链接"
                                width="180"
                                align="center">
                                <template slot-scope="scope">
                                  <el-popover trigger="hover" placement="top">
                                    <p>链接: {{ scope.row.Url }}</p>
                                    <div slot="reference" class="name-wrapper">
                                      <el-tag size="medium">{{ scope.row.Url.substring(0,10)+'...' }}</el-tag>
                                    </div>
                                  </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="Frequency"
                                label="频率"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="SetTime"
                                label="查询时间"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="func"
                                label="操作"
                                align="center">
                                <template slot-scope="scope">
                                  <font size="4" color="black">
                                  <i class="el-icon-delete" style="cursor:pointer" @click="delete_row('word',scope.$index, tableData_Theme)"></i>
                                  <i class="el-icon-edit" style="cursor:pointer"  @click="edit_row('word',scope.$index, tableData_Theme)"></i>
                                  </font>
                                </template>
                            </el-table-column>
                            <!--
                            <el-table-column
                                prop="readstatus"
                                label="阅读状态"
                                align="center">
                            </el-table-column> -->
                      </el-table>
                      <br>
                      <div style="height:40px;width:100%;text-align:center">
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="tableData_WordCount.length"
                        :page-size="pagesize_word"
                        :current-page="currentpage_word"
                        @current-change="handlecurrentchange_word"
                        >
                        </el-pagination>
                      </div>
                      <br>
                    </div>
                    <br>
                    <div >
                      <i class="el-icon-info">订阅结果集信息</i>
                    </div>
                    <br>
                    <div class="el-footer-me" :style="{'display':second_show_foot}">
                      <div style="float:right;margin-right:80px;margin-top:10px">
                          <font size="4" color="black">
                            <i class="el-icon-more" style="cursor:pointer" @click="more_result('fcdy')"></i>
                          </font>
                        </div>
                      <div id="echartsposition"  style="width:600px;height:400px;margin:auto;">
                      </div>
                    </div>
                    <div class="foot_for_text" :style="{'display':second_show_foot_other}">
                      <div style="margin:auto auto">
                        <font size="4" color="black">
                        <a style="align:center">当前订阅结果集为空</a>
                        </font>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="动态订阅" name="third">
                    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                      <div style="float:right;margin-right:20px;letter-spacing:2px;margin-bottom:10px">
                        <font size="4" color="black" >
                          <i class="el-icon-plus" style="cursor:pointer" @click="openthmeadd('url')"></i>
                          <i class="el-icon-setting"></i>
                          <i class="el-icon-more"></i>
                        </font>
                      </div>
                      <el-table
                            :data="tableData_Url.slice(pagesize_url*(currentpage_url-1),pagesize_url*currentpage_url)"
                            style="width: 100%;text-align:center;"
                            align="center"
                            @row-click="show_url_new"
                            highlight-current-row>
                            <el-table-column
                                prop="SubscriptionID"
                                label="订阅ID"
                                width="180"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="Subject"
                                label="订阅主题"
                                width="180"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="Url"
                                label="订阅链接"
                                width="180"
                                align="center">
                                <template slot-scope="scope">
                                  <el-popover trigger="hover" placement="top">
                                    <p>链接: {{ scope.row.Url }}</p>
                                    <div slot="reference" class="name-wrapper">
                                      <el-tag size="medium">{{ scope.row.Url.substring(0,10)+'...' }}</el-tag>
                                    </div>
                                  </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="Frequency"
                                label="频率"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="SetTime"
                                label="查询时间"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="func"
                                label="操作"
                                align="center">
                                <template slot-scope="scope">
                                  <font size="4" color="black">
                                  <i class="el-icon-delete" style="cursor:pointer" @click="delete_row('url',scope.$index)"></i>
                                  <i class="el-icon-edit" style="cursor:pointer" @click="edit_row('url',scope.$index)"></i>
                                  </font>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="readstatus"
                                label="阅读状态"
                                align="center">
                            </el-table-column> -->
                      </el-table>
                      <br>
                      <div style="height:40px;width:100%;text-align:center">
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="tableData_Url.length"
                        :page-size="pagesize_url"
                        :current-page="currentpage_url"
                        @current-change="handlecurrentchange_url"
                        >
                        </el-pagination>
                      </div>
                      <br>
                    </div>
                    <br>
                    <div >
                      <i class="el-icon-info">订阅结果集信息</i>
                    </div>
                    <br>
                    <div class="ztdy_foot_show" :style="{'display': third_show_foot}">
                      <div style="width:100%;height:30px;background-color:rgb(138, 184, 243);align:center" >
                        <div style="float:left;"><el-button size="mini">标记为已读</el-button></div>
                        <div style="float:right;">
                          <a>{{dtdy_foot_page}}/{{dtdy_all_page}}页</a>
                          <el-button size="mini" icon="el-icon-arrow-left" @click="pageupdt" :disabled="dtupdisabled">上一页</el-button>
                          <el-button size="mini"  @click="pagedowndt" :disabled="dtdowndisabled">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                        </div>
                      </div>
                      <table border="1" bordercolor="#DDDDDD" style="margin:auto;border-collapse:collapse;width:100%;line-height:42px">
                        <tr>
                          <th style="width:10%"><input @change="SelectAlldt" type="checkbox"></th>
                          <th style="width:25%">主题</th>
                          <th style="width:50%">新增链接</th>
                          <th style="width:30%">时间</th>
                        </tr>
                        <template v-if="dtdy_today.length > 0">
                          <tr>
                            <td style="border-bottom:5px solid gray">今天</td>
                            <td style="border-bottom:5px solid gray"></td>
                            <td style="border-bottom:5px solid gray"></td>
                          </tr>
                          <tr v-for="row in dtdy_today.slice((dtdy_foot_page-1)*25,(dtdy_foot_page)*25)" :label="row.Id" :key="row.Id">
                            <template  v-if="row.ReadMark == 'False'">
                              <td><input type="checkbox" :id="'dtdy'+row.Id"></td>
                              <td style="font-weight:bold;">{{dtdy_subject}}</td>
                              <td><a style="font-weight:bold;color:black;text-decoration:none" :href="row.Url" @click="havareadrow_dtdy(row.Id)">{{row.Url.substring(0,20)}}</a>
                              </td>
                              <td style="font-weight:bold">{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                            <template  v-else>
                              <td><input type="checkbox" :id="'dtdy'+row.Id"></td>
                              <td>{{dtdy_subject}}</td>
                              <td><a :href="row.Url" style="color:black;text-decoration:none">{{row.Url.substring(0,40)}}</a>
                              <td>{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                          </tr>
                        </template>
                        <template v-if="dtdy_today.length < 25*dtdy_foot_page && dtdy_week.length > 0 && dtdy_foot_page_list_week < dtdy_week.length">
                          <tr>
                            <td style="border-bottom:5px solid gray">七天内</td>
                            <td style="border-bottom:5px solid gray"></td>
                            <td style="border-bottom:5px solid gray"></td>
                          </tr>
                          <tr v-for="row in dtdy_week.slice(dtdy_foot_page_list_week,25*dtdy_foot_page-dtdy_today.length)" :label="row.Id" :key="row.Id">
                            <template  v-if="row.ReadMark == 'False'">
                              <td><input type="checkbox" :id="'dtdy'+row.Id"></td>
                              <td style="font-weight:bold;">{{dtdy_subject}}</td>
                              <td><a style="font-weight:bold;color:black;" :href="row.Url" @click="havareadrow_dtdy(row.Id)">{{row.Url.substring(0,20)}}</a>
                              </td>
                              <td style="font-weight:bold">{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                            <template  v-else>
                              <td><input type="checkbox" :id="'dtdy'+row.Id"></td>
                              <td>{{dtdy_subject}}</td>
                              <td><a :href="row.Url" style="color:black;">{{row.Url.substring(0,20)}}</a>
                              <td>{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                          </tr>
                        </template>
                        <template v-if="(dtdy_today.length+dtdy_week.length) < 25*dtdy_foot_page && dtdy_longer.length > 0">
                          <tr>
                            <td style="border-bottom:5px solid gray">更早</td>
                            <td style="border-bottom:5px solid gray"></td>
                            <td style="border-bottom:5px solid gray"></td>
                            <td style="border-bottom:5px solid gray"></td>
                          </tr>
                          <tr v-for="row in dtdy_longer.slice(dtdy_foot_page_list_longer,25*dtdy_foot_page-(dtdy_today.length+dtdy_week.length))" :label="row.Id" :key="row.Id">
                            <template  v-if="row.ReadMark == 'False'">
                              <td><input type="checkbox" :id="'dtdy'+row.Id"></td>
                              <td style="font-weight:bold;">{{dtdy_subject}}</td>
                              <td><a font-color="black" style="font-weight:bold;color:black;" :href="row.Url" @click="havareadrow_dtdy(row.Id)">{{row.Url.substring(0,20)}}</a>
                              </td>
                              <td style="font-weight:bold">{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                            <template  v-else>
                              <td><input type="checkbox" :id="'dtdy'+row.Id"></td>
                              <td>{{dtdy_subject}}</td>
                              <td><a :href="row.Url" style="color:black">{{row.Url.substring(0,20)}}</a>
                              <td>{{row.ExecTime.substring(0,10)}}</td>
                            </template >
                          </tr>
                        </template>
                      </table>
                    </div>
                    <div class="foot_for_text" :style="{'display': third_show_foot_other}">
                      <div style="margin:auto auto">
                        <font size="4" color="black">
                        <p style="align:center">当前订阅结果集为空</p>
                        </font>
                      </div>
                    </div>
                  </el-tab-pane>
              </el-tabs>
            </el-main>
          </el-container>
        </el-scrollbar>

        <!-- 这是被隐藏的添加主题订阅表 -->
        <el-dialog style="width: 100%;margin: auto;" title="添加订阅" :visible.sync="dialogFormThemeSubVisible" center :append-to-body="true">
          <el-form ref="" :v-model="ThemeSub">
              <el-form-item label="主题:" :label-width="'30%'">
                <el-input v-model="ThemeSub.theme" autocomplete="off" size="small" style="width:90%" placeholder="请输入主题"></el-input>
              </el-form-item>
              <el-form-item label="关键字:" :label-width="'30%'">
                <el-input v-model="ThemeSub.keyword" autocomplete="off" size="small" style="width:90%" placeholder="请输入关键字"></el-input>
              </el-form-item>
              <el-form-item label="频率:" :label-width="'30%'" >
                <div class="block">
                  <span class="demonstration"></span>
                  <el-cascader
                    size="small"
                    v-model="ThemeSub.freq"
                    :options="options_freq"
                    style="width:90%"
                    ></el-cascader>
                </div>
              </el-form-item>
              <el-form-item label="结果返回类型:" :label-width="'30%'" >
                <el-select size="small" v-model="ThemeSub.return_type" placeholder="请选择"   style="width:90%">
                  <el-option
                    v-for="item in return_type_Theme"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱:" :label-width="'30%'" >
                <!-- 循环生成输入框 -->
                <!-- 仅在最末行input框添加check功能 下同 -->
                <div v-if="emailsinput.length==1">
                    <div v-for="(item,index) in emailsinput" :key="index">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                    style="width:60%" suffix-icon="el-icon-message"
                    v-on:input="check_email('add_theme',item.model)"></el-input>
                      <el-button type="danger" :disabled="true" icon="el-icon-delete" size="mini" @click="delete_email('add_theme',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_add_theme}" @click="add_email('add_theme')" circle></el-button>
                    </div>
                </div>
                <div v-else>
                  <div v-for="(item,index) in emailsinput" :key="index">
                    <div v-if="index == (emailsinput.length-1)">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('add_theme',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('add_theme',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_add_theme}" @click="add_email('add_theme')" circle></el-button>
                    </div>
                    <div v-else>
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('add_theme',item.model)"
                      ></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('add_theme',index)" circle></el-button>
                    </div>
                  </div>
                </div>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button id="addztdy" type="primary" @click.prevent="Add_Sub_Theme('theme')" :disabled="bt_dis_for_addztsub">确 定</el-button>
              <el-button @click="closeall()" >取 消</el-button>
          </span>
        </el-dialog>

        <!-- 这是被隐藏的修改主题订阅表 -->
        <el-dialog style="width: 100%;margin: auto;" title="修改订阅" :visible.sync="dialogFormThemeSubEVisible" center>
          <el-form ref="" :v-model="ThemeSubE">
              <el-form-item label="主题:" :label-width="'30%'">
                <el-input v-model="ThemeSubE.theme" autocomplete="off" size="small" style="width:90%" placeholder="请输入主题"></el-input>
              </el-form-item>
              <el-form-item label="关键字:" :label-width="'30%'">
                <el-input v-model="ThemeSubE.keyword" autocomplete="off" size="small" style="width:90%" placeholder="请输入关键字"></el-input>
              </el-form-item>
              <el-form-item label="频率:" :label-width="'30%'" >
                <div class="block">
                  <span class="demonstration"></span>
                  <el-cascader
                    size="small"
                    v-model="ThemeSubE.freq"
                    :options="options_freq"
                    style="width:90%"
                    ></el-cascader>
                </div>
              </el-form-item>
              <el-form-item label="结果返回类型:" :label-width="'30%'" >
                <el-select size="small" v-model="ThemeSubE.return_type" placeholder="请选择" style="width:90%">
                  <el-option
                    v-for="item in return_type_Theme"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱:" :label-width="'30%'" >
                <!-- 循环生成输入框 -->
                    <div v-if="emailsinput_edit_theme.length==1">
                        <div v-for="(item,index) in emailsinput_edit_theme" :key="index">
                          <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                        style="width:60%" suffix-icon="el-icon-message"
                        v-on:input="check_email('edit_theme',item.model)"></el-input>
                          <el-button type="danger" :disabled="true" icon="el-icon-delete" size="mini" @click="delete_email('edit_theme',index)" circle></el-button>
                          <el-button type="success" icon="el-icon-plus" size="mini" @click="add_email('edit_theme')" circle></el-button>
                        </div>
                    </div>
                    <div v-else>
                      <div v-for="(item,index) in emailsinput_edit_theme" :key="index">
                        <div v-if="index == (emailsinput_edit_theme.length-1)">
                          <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                          style="width:60%" suffix-icon="el-icon-message"
                          v-on:input="check_email('edit_theme',item.model)"></el-input>
                          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('edit_theme',index)" circle></el-button>
                          <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_edit_theme}" @click="add_email('edit_theme')" circle></el-button>
                        </div>
                        <div v-else>
                          <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                          style="width:60%" suffix-icon="el-icon-message"
                          v-on:input="check_email('edit_theme',item.model)"></el-input>
                          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('edit_theme',index)" circle></el-button>
                        </div>
                      </div>
                    </div>
              </el-form-item>
              <!-- <el-form-item label="验证码:" :label-width="formLabelWidth">
              <el-input v-model="form.checkcode" style="width: 120px;" autocomplete="off"></el-input>
              <img style="height: 40px; width: 80px;" src="./img/1.jpg"></img>
              </el-form-item> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click.prevent="edit_row_Push('theme')" :disabled="bt_dis_for_edtztsub">确 定</el-button>
              <el-button @click="closeall()" >取 消</el-button>
          </span>
        </el-dialog>

        <!-- 这是被隐藏的添加word主题订阅表 -->
        <el-dialog style="width:  100%;margin: auto;" title="添加订阅" :visible.sync="dialogFormWordSubVisible" center>
          <el-form ref="" :v-model="WordSub">
              <el-form-item label="主题:" :label-width="'30%'">
                <el-input v-model="WordSub.theme" autocomplete="off" size="small" style="width:90%" placeholder="请输入主题"></el-input>
              </el-form-item>
              <el-form-item label="网址:" :label-width="'30%'">
                <div v-if="url_inputs_word.length==1">
                    <div v-for="(item,index) in url_inputs_word" :key="index">
                      <el-input  v-model="item.model" size="small" placeholder="请输入网址"
                    style="width:60%"
                    v-on:input="check_email('add_word_url',item.model)"></el-input>
                      <el-button type="danger" :disabled="true" icon="el-icon-delete" size="mini" @click="delete_email('add_word_url',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_add_word_url}" @click="add_email('add_word_url')" circle></el-button>
                    </div>
                </div>
                <div v-else>
                  <div v-for="(item,index) in url_inputs_word" :key="index">
                    <div v-if="index == (url_inputs_word.length-1)">
                      <el-input  v-model="item.model" size="small" placeholder="请输入网址"
                      style="width:60%"
                      v-on:input="check_email('add_word_url',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('add_word_url',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_add_word_url}" @click="add_email('add_word_url')" circle></el-button>
                    </div>
                    <div v-else>
                      <el-input  v-model="item.model" size="small" placeholder="请输入网址"
                      style="width:60%"
                      v-on:input="check_email('add_word_url',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('add_word_url',index)" circle></el-button>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="频率:" :label-width="'30%'">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-cascader
                    size="small"
                    v-model="WordSub.freq"
                    :options="options_freq"
                    style="width:90%"></el-cascader>
                </div>
              </el-form-item>
              <el-form-item label="邮箱:" :label-width="'30%'" >
                <!-- 循环生成输入框 -->
                <!-- 新的一种格式 -->
                <div v-if="emailsinput_word.length==1">
                    <div v-for="(item,index) in emailsinput_word" :key="index">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                    style="width:60%" suffix-icon="el-icon-message"
                    v-on:input="check_email('add_word',item.model)"></el-input>
                      <el-button type="danger" :disabled="true" icon="el-icon-delete" size="mini" @click="delete_email('add_word',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_add_word}" @click="add_email('add_word')" circle></el-button>
                    </div>
                </div>
                <div v-else>
                  <div v-for="(item,index) in emailsinput_word" :key="index">
                    <div v-if="index == (emailsinput_word.length-1)">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('add_word',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('add_word',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_add_word}" @click="add_email('add_word')" circle></el-button>
                    </div>
                    <div v-else>
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('add_word',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('add_word',index)" circle></el-button>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item label="验证码:" :label-width="formLabelWidth">
              <el-input v-model="form.checkcode" style="width: 120px;" autocomplete="off"></el-input>
              <img style="height: 40px; width: 80px;" src="./img/1.jpg"></img>
              </el-form-item> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click.prevent="Add_Sub_Theme('word')" :disabled="bt_dis_for_addfcsub">确 定</el-button>
              <el-button @click="closeall()" >取 消</el-button>
          </span>
        </el-dialog>

        <!-- 这是被隐藏的修改word主题订阅表 -->
        <el-dialog style="width: 100%;margin: auto;" title="修改订阅" :visible.sync="dialogFormWordSubEVisible" center>
          <el-form ref="" :v-model="WordSubE">
              <el-form-item label="主题:" :label-width="'30%'">
                <el-input v-model="WordSubE.theme" autocomplete="off" size="small" style="width:90%" placeholder="请输入主题"></el-input>
              </el-form-item>
              <el-form-item label="网址:" :label-width="'30%'">
                <div v-if="url_edit_word.length==1">
                    <div v-for="(item,index) in url_edit_word" :key="index">
                      <el-input  v-model="item.model" size="small" placeholder="请输入网址"
                    style="width:60%"
                    v-on:input="check_email('edit_word_url',item.model)"></el-input>
                      <el-button type="danger" :disabled="true" icon="el-icon-delete" size="mini" @click="delete_email('edit_word_url',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini"  @click="add_email('edit_word_url')" circle></el-button>
                    </div>
                </div>
                <div v-else>
                  <div v-for="(item,index) in url_edit_word" :key="index">
                    <div v-if="index == (url_edit_word.length-1)">
                      <el-input  v-model="item.model" size="small" placeholder="请输入网址"
                      style="width:60%"
                      v-on:input="check_email('edit_word_url',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('edit_word_url',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_edit_word_url}" @click="add_email('edit_word_url')" circle></el-button>
                    </div>
                    <div v-else>
                      <el-input  v-model="item.model" size="small" placeholder="请输入网址"
                      style="width:60%"
                      v-on:input="check_email('edit_word_url',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('edit_word_url',index)" circle></el-button>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="频率:" :label-width="'30%'" >
                <div class="block">
                  <span class="demonstration"></span>
                  <el-cascader
                    size="small"
                    v-model="WordSubE.freq"
                    :options="options_freq"
                    style="90%"></el-cascader>
                </div>
              </el-form-item>
              <el-form-item label="邮箱:" :label-width="'30%'" >
                <!-- 循环生成输入框 -->
                <!-- 新的一种格式 -->
                <div v-if="emailsinput_edit_word.length==1">
                    <div v-for="(item,index) in emailsinput_edit_word" :key="index">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                    style="width:60%" suffix-icon="el-icon-message"
                    v-on:input="check_email('edit_word',item.model)"></el-input>
                      <el-button type="danger" :disabled="true" icon="el-icon-delete" size="mini" @click="delete_email('edit_word',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini"  @click="add_email('edit_word')" circle></el-button>
                    </div>
                </div>
                <div v-else>
                  <div v-for="(item,index) in emailsinput_edit_word" :key="index">
                    <div v-if="index == (emailsinput_edit_word.length-1)">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('edit_word',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('edit_word',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_edit_word}" @click="add_email('edit_word')" circle></el-button>
                    </div>
                    <div v-else>
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('edit_word',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('edit_word',index)" circle></el-button>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item label="验证码:" :label-width="formLabelWidth">
              <el-input v-model="form.checkcode" style="width: 120px;" autocomplete="off"></el-input>
              <img style="height: 40px; width: 80px;" src="./img/1.jpg"></img>
              </el-form-item> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click.prevent="edit_row_Push('word')" :disabled="bt_dis_for_edtfcsub">确 定</el-button>
              <el-button @click="closeall()" >取 消</el-button>
          </span>
        </el-dialog>

        <!-- 这是被隐藏的添加url主题订阅表 -->
        <el-dialog style="width: 100%;margin: auto;" title="添加订阅" :visible.sync="dialogFormUrlSubVisible" center>
          <el-form ref="" :v-model="UrlSub">
              <el-form-item label="主题:" :label-width="'30%'">
                <el-input v-model="UrlSub.theme" autocomplete="off" size="small" style="width:90%" placeholder="请输入主题"></el-input>
              </el-form-item>
              <el-form-item label="网址:" :label-width="'30%'" >
                <el-input v-model="UrlSub.url" autocomplete="off"
                size="small" placeholder="请输入网址" style="width:90%"
                v-on:input="check_email('url_url','')"></el-input>
              </el-form-item>
              <el-form-item label="频率:" :label-width="'30%'" >
                <div class="block">
                  <span class="demonstration"></span>
                  <el-cascader
                    size="small"
                    v-model="UrlSub.freq"
                    :options="options_freq"
                    style="width:90%"></el-cascader>
                </div>
              </el-form-item>
              <el-form-item label="邮箱:" :label-width="'30%'" >
                <!-- 循环生成输入框 -->
                <!-- 新的一种格式 -->
                <div v-if="emailsinput_url.length==1">
                    <div v-for="(item,index) in emailsinput_url" :key="index">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                    style="width:60%" suffix-icon="el-icon-message"
                    v-on:input="check_email('add_url',item.model)"></el-input>
                      <el-button type="danger" :disabled="true" icon="el-icon-delete" size="mini" @click="delete_email('add_word',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_add_url}" @click="add_email('add_url')" circle></el-button>
                    </div>
                </div>
                <div v-else>
                  <div v-for="(item,index) in emailsinput_url" :key="index">
                    <div v-if="index == (emailsinput_url.length-1)">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('add_url',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('add_url',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_add_url}" @click="add_email('add_url')" circle></el-button>
                    </div>
                    <div v-else>
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('add_url',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('add_url',index)" circle></el-button>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item label="验证码:" :label-width="formLabelWidth">
              <el-input v-model="form.checkcode" style="width: 120px;" autocomplete="off"></el-input>
              <img style="height: 40px; width: 80px;" src="./img/1.jpg"></img>
              </el-form-item> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click.prevent="Add_Sub_Theme('url')" :disabled="bt_dis_for_adddtsub" >确 定</el-button>
              <el-button @click="dialogFormUrlSubVisible = false" >取 消</el-button>
          </span>
        </el-dialog>
        <!-- 这是被隐藏的修改url主题订阅表 -->
        <el-dialog style="width: 100%;margin: auto;" title="修改订阅" :visible.sync="dialogFormUrlSubEVisible" center>
          <el-form ref="" :v-model="UrlSubE">
              <el-form-item label="主题:" :label-width="'30%'">
                <el-input v-model="UrlSubE.theme" autocomplete="off" size="small" style="width:90%" placeholder="请输入主题"></el-input>
              </el-form-item>
              <el-form-item label="网址:" :label-width="'30%'">
                <el-input v-model="UrlSubE.url" autocomplete="off" size="small" style="width:90%" placeholder="请输入网址" v-on:input="check_email('edit_url_url','')"></el-input>
              </el-form-item>
              <el-form-item label="频率:" :label-width="'30%'" >
                <div class="block">
                  <span class="demonstration"></span>
                  <el-cascader
                    size="small"
                    v-model="UrlSubE.freq"
                    :options="options_freq"
                    style="width:90%"></el-cascader>
                </div>
              </el-form-item>
              <el-form-item label="邮箱:" :label-width="'30%'" >
                <!-- 循环生成输入框 -->
                <!-- 新的一种格式 -->
                <div v-if="emailsinput_edit_url.length==1">
                    <div v-for="(item,index) in emailsinput_edit_url" :key="index">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                    style="width:60%" suffix-icon="el-icon-message"
                    v-on:input="check_email('edit_url',item.model)"></el-input>
                      <el-button type="danger" :disabled="true" icon="el-icon-delete" size="mini" @click="delete_email('edit_url',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" @click="add_email('edit_url')" circle></el-button>
                    </div>
                </div>
                <div v-else>
                  <div v-for="(item,index) in emailsinput_edit_url" :key="index">
                    <div v-if="index == (emailsinput_edit_url.length-1)">
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('edit_url',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('edit_url',index)" circle></el-button>
                      <el-button type="success" icon="el-icon-plus" size="mini" :style="{'display':display_edit_url}" @click="add_email('edit_url')" circle></el-button>
                    </div>
                    <div v-else>
                      <el-input  v-model="item.model" size="small" placeholder="请输入邮箱"
                      style="width:60%" suffix-icon="el-icon-message"
                      v-on:input="check_email('edit_url',item.model)"></el-input>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_email('edit_url',index)" circle></el-button>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item label="验证码:" :label-width="formLabelWidth">
              <el-input v-model="form.checkcode" style="width: 120px;" autocomplete="off"></el-input>
              <img style="height: 40px; width: 80px;" src="./img/1.jpg"></img>
              </el-form-item> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click.prevent="edit_row_Push('url')" :disabled="bt_dis_for_edtdtsub">确 定</el-button>
              <el-button @click="closeall()" >取 消</el-button>
          </span>
        </el-dialog>

        <!-- 详情页面动态订阅 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisibledtdy"
          width="60%">
          <p>未读</p>
          <el-table :data="dtdy_foot_unread.slice(pagesize_dtdy_unread*(currentpage_dtdy_unread-1),pagesize_dtdy_unread*currentpage_dtdy_unread)"
          @row-click="havareadrow_dtdy">
            <el-table-column property="sub" label="主题" width="200px">
              {{dtdy_subject}}
            </el-table-column>
            <el-table-column property="Url" label="新增链接" width="500px">
              <template slot-scope="scope">
                <a :href="scope.row.Url" target="_blank">{{scope.row.Url}}</a>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <div style="height:40px;width:100%;text-align:center">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="dtdy_foot_unread.length"
            :page-size="pagesize_dtdy_unread"
            :current-page="currentpage_dtdy_unread"
            @current-change="handlecurrentchange_dtdy_unread"
            >
            </el-pagination>
          </div>
          <p>已读</p>
          <el-table :data="dtdy_foot_read.slice(pagesize_dtdy_read*(currentpage_dtdy_read-1),pagesize_dtdy_read*currentpage_dtdy_read)">
            <el-table-column property="主题" label="Id" width="200px">
            {{dtdy_subject}}
            </el-table-column>
            <el-table-column property="Url" label="新增链接" width="500px">
              <template slot-scope="scope">
                <a :href="scope.row.Url">{{scope.row.Url}}</a>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-left:40%;margin-top:10px;margin-bottom:0px">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="dtdy_foot_read.length"
            :page-size="pagesize_dtdy_read"
            :current-page="currentpage_dtdy_read"
            @current-change="handlecurrentchange_dtdy_read"
            >
            </el-pagination>
          </div>
        </el-dialog>

        <!-- 详情页面分词订阅 -->
        <el-dialog
          title="详细情况"
          :visible.sync="dialogVisiblefcdy"
          width="50%"
          @open="openfcdialog"
          ref="fcdialog"
          >
            <el-table :data="fcdy_table_item.slice(pagesize_fcdy_read*(currentpage_fcdy_read-1),pagesize_fcdy_read*currentpage_fcdy_read)" >
              <el-table-column property="word" label="词语" width="350px"></el-table-column>
              <el-table-column property="frequence" label="频次" width="350px"></el-table-column>
            </el-table>
            <br>
            <div style="height:40px;width:100%;text-align:center">
              <el-pagination
              background
              layout="prev, pager, next"
              :total="fcdy_table_item.length"
              :page-size="pagesize_fcdy_read"
              :current-page="currentpage_fcdy_read"
              @current-change="handlecurrentchange__fcdy_read"
              >
              </el-pagination>
            </div>
          <span slot="footer" class="dialog-footer">
          <div>
            <div id="echarts_po_de" style="width:400px;height:400px;margin:auto;">
            </div>
          </div>
          </span>
        </el-dialog>
      </div>
    </body>
  </html>
</template>

<script>
/* eslint-disable */
//import {Addemail,Deleteemail,AddSub,Whenload,DeleteRow,EditRowOpen,PushEdit} from '../js/func'
    export default {
      data:function() {
        return {
          // 结果分页zt
          ztupdisabled:true,
          ztdowndisabled:false,
          ztdy_foot_page:1,
          ztdy_all_page:0,
          ztdy_foot_page_list_week:0,
          ztdy_foot_page_list_longer:0,
          // 结果分页dt
          dtupdisabled:true,
          dtdowndisabled:false,
          dtdy_foot_page:1,
          dtdy_all_page:0,
          dtdy_foot_page_list_week:0,
          dtdy_foot_page_list_longer:0,
          // 确定当前所需查询的动态的订阅id
          detail_get_id_ztdy:'',
          detail_get_id_fcdy:'',
          detail_get_id_dtdy:'',
          // 订阅主题 仅有动态订阅
          dtdy_subject:'',
          //按钮是否能用
          bt_dis_for_addztsub:true,
          bt_dis_for_edtztsub:false,
          bt_dis_for_adddtsub:true,
          bt_dis_for_edtdtsub:false,
          bt_dis_for_addfcsub:true,
          bt_dis_for_edtfcsub:false,
          //按钮show or not show
          display_add_theme:'none',
          display_edit_theme:'',
          display_add_word:'none',
          display_add_url:'none',
          display_edit_word:'',
          display_edit_url:'',
          display_add_word_url:'none',
          display_edit_word_url:'',
          display_add_url_url:'none',
          display_edit_url_url:'',
          //切换显示页脚元素
          first_show_foot:'none',
          first_show_foot_other:'none',
          second_show_foot:'none',
          second_show_foot_other:'none',
          third_show_foot:'none',
          third_show_foot_other:'none',
          //气泡确认框
          visible:false,
          fcdy_table_item:[],
          //表格
          pagesize_theme:4,
          pagesize_word:4,
          pagesize_url:4,
          pagesize_ztdy_read:4,
          pagesize_ztdy_unread:4,
          pagesize_dtdy_read:4,
          pagesize_dtdy_unread:4,
          pagesize_fcdy_read:4,
          currentpage_theme:1,
          currentpage_word:1,
          currentpage_url:1,
          currentpage_ztdy_read:1,
          currentpage_ztdy_unread:1,
          currentpage_dtdy_read:1,
          currentpage_dtdy_unread:1,
          currentpage_fcdy_read:1,
          activeName: 'first',
          // 页面下嵌的表格
          ztdy_today:[],
          ztdy_week:[],
          ztdy_longer:[],
          dtdy_today:[],
          dtdy_week:[],
          dtdy_longer:[],
          //三个表格：主题订阅 热点订阅 url追踪订阅
          tableData_Theme: [],
          tableData_WordCount:[],
          tableData_Url:[],
          //时间线
          activities: [],
          //多级选项 用于选择频率
          options_freq: [{
            value: 'week',
            label: '每周',
            children: [
              { value: '1',
                label: '周一',},
              { value: '2',
                label: '周二',},
              { value: '3',
                label: '周三',},
              { value: '4',
                label: '周四',},
              { value: '5',
                label: '周五',},
              { value: '6',
                label: '周六',},
              { value: '7',
                label: '周日',}
            ]
            }, {
            value: 'day',
            label: '每天',
            children: [
              { value: '0',
                label: '0:00',},
                { value: '2',
                label: '2:00',},
                { value: '4',
                label: '4:00',},
                { value: '6',
                label: '6:00',},
                { value: '8',
                label: '8:00',},
                { value: '10',
                label: '10:00',},
                { value: '12',
                label: '12:00',},
                { value: '14',
                label: '14:00',},
                { value: '16',
                label: '16:00',},
                { value: '18',
                label: '18:00',},
                { value: '20',
                label: '20:00',},
                { value: '22',
                label: '22:00',}
            ]
            },{
            value: 'month',
            label: '每月',
            children: [
              { value: '1',
                label: '每月1日',},
                { value: '2',
                label: '每月2日',},
                { value: '4',
                label: '每月4日',},
                { value: '6',
                label: '每月6日',},
                { value: '8',
                label: '每月8日',},
                { value: '10',
                label: '每月10日',},
                { value: '12',
                label: '每月12日',},
                { value: '14',
                label: '每月14日',},
                { value: '16',
                label: '每月16日',},
                { value: '18',
                label: '每月18日',},
                { value: '20',
                label: '每月20日',},
                { value: '22',
                label: '每月22日',},
                { value: '20',
                label: '每月20日',},
                { value: '22',
                label: '每月22日',},
                { value: '24',
                label: '每月24日',},
                { value: '26',
                label: '每月26日',},
                { value: '28',
                label: '每月28日',},
              
            ]
            },{
            value: 'immediate',
            label: '有新内容时',
            }],
          
          //修改订阅时候的邮件添加列表
          emailsinput_edit_theme:[],
          emailsinput_edit_word:[],
          emailsinput_edit_url:[],
          //三个添加订阅时候的邮件添加表
          emailsinput:[
            {
              model:'',
            }
          ],
          emailsinput_word:[
            {
              model:'',
            }
          ],
          emailsinput_url:[
            {
              model:'',
            }
          ],
          //两个添加订阅中的url添加包括修改和添加
          url_inputs_word:[
            {
              model:'',
            }
          ],
          url_inputs_url:[
            {
              model:'',
            }
          ],
          url_edit_word:[],
          url_edit_url:[],
          // 显示底部动态的表
          ztdy_foot:[],
          dtdy_foot_read:[],
          fcdy_foot_read:[],
          dtdy_foot_unread:[],
          fcdy_foot_unread:[],
          // 新开页面显示订阅详细记录
          ztdy_detail_read:[],
          ztdy_detail_unread:[],
          fcdy_detail_read:[],
          fcdy_detail_unread:[],
          dtdy_detail_read:[],
          dtdy_detail_unread:[],
          //以下是添加订阅时显示的对话框
          dialogFormThemeSubVisible:false,
          dialogFormThemeSubEVisible:false,
          dialogFormWordSubVisible:false,
          dialogFormWordSubEVisible:false,
          dialogFormUrlSubVisible:false,
          dialogFormUrlSubEVisible:false,
          dialogFormThemeSubVisibletest:false,
          dialogVisibledtdy:false,
          dialogVisibleztdy:false,
          dialogVisiblefcdy:false,
          //对话框内的属性
          ThemeSub:{
            theme:'',
            keyword:'',
            freq:'',
            time:'',
            return_type:'',
            emails:'',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          ThemeSubE:{
            theme:'',
            keyword:'',
            freq:'',
            time:'',
            return_type:'',
            emails:'',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          WordSub:{
            url:'',
            freq:'',
            theme:''
          },
          WordSubE:{
            fre:'',
            theme:''
          },
          UrlSub:{
            url:'',
            freq:'',
            theme:''
          },
          UrlSubE:{
            url:'',
            fre:'',
            theme:''
          },

          formLabelWidth:'180px',
          return_type_Theme:[{
              value: 'PDF',
              label: 'PDF',
            },
            {
              value: 'Email',
              label: 'Email',
            }],
            checkVals: []
          }
        },
      mounted:function(){
        //同步加载才能实现数据返回();
        this.$Onload(this.$route.query.username);
      },
      methods:{
        // 打开fc窗口
        openfcdialog:function(){
          this.fcdy_table_item = []
          if (this.fcdy_foot_read.length === 0) {
            var word_list = this.fcdy_foot_unread[0].WordFrequency.split(',')
            for (var i = 0; i < word_list.length; i++) {
              var word_one = word_list[i].split(':')
              this.fcdy_table_item.push({
                'word': word_one[0],
                'frequence': word_one[1]
              })
            }
            this.$LoadEcharts('echarts_po_de', this.fcdy_foot_unread[0].WordFrequency)
          } else {
            word_list = this.fcdy_foot_read[0].WordFrequency.split(',')
            for (i = 0; i < word_list.length; i++) {
              word_one = word_list[i].split(':')
              this.fcdy_table_item.push({
                'word': word_one[0],
                'frequence': word_one[1]
              })
            }     
            this.$LoadEcharts('echarts_po_de', this.fcdy_foot_read[0].WordFrequency)
            }
        },
        //退出
        quit:function(){
          localStorage.clear();
          this.$router.go(0);
        },
        //增加一个输入框 已完成
        add_email:function(type){
          
          this.$Addemail(type);
        },
        //删除输入框 已完成
        delete_email:function(type, index){
          // var Deleteemail = require('Deleteemail');
          this.$Deleteemail(type, index);
          },
        //增加主题订阅 已完成
        Add_Sub_Theme:function(type) {
          this.$AddSub(type);
          },
        //表格换页 已完成
        handlecurrentchange_theme:function(val){
          //此处val即为当前页
          this.currentpage_theme=val; 
        },
        //不好添加参数因此写三个表格换页
        handlecurrentchange_word:function(val){
          //此处val即为当前页
          this.currentpage_word=val; 
        },
        handlecurrentchange_url:function(val){
          //此处val即为当前页
          this.currentpage_url=val; 
        },
        handlecurrentchange_dtdy_read:function(val){
          //此处val即为当前页
          this.currentpage_dtdy_read=val; 
        },
        handlecurrentchange_dtdy_unread:function(val){
          //此处val即为当前页
          this.currentpage_dtdy_unread=val; 
        },
        handlecurrentchange_ztdy_read:function(val){
          //此处val即为当前页
          this.currentpage_ztdy_read=val; 
        },
        handlecurrentchange__ztdy_unread:function(val){
          //此处val即为当前页
          this.currentpage_ztdy_unread=val; 
        },
        handlecurrentchange__fcdy_read:function(val){
          //此处val即为当前页
          this.currentpage_fcdy_read=val; 
        },
        //显示最新的主题内容
        show_theme_new:async function(val){
          //此处val为当前点击行全部数据
          //后续可根据订阅ID来进行一个查询
          //未完待续...
          this.ztdy_today = []
          this.ztdy_week = []
          this.ztdy_longer = []
          this.ztdy_foot_page = 1
          this.ztdy_foot_page_list_week = 0
          this.ztdy_foot_page_list_longer = 0
          this.detail_get_id_ztdy = val.SubscriptionID
          var value_zt = await this.$SelectSub(val.SubscriptionID)
          console.log(value_zt.result)
          this.ztdy_foot = value_zt.result;
          if (value_zt.result == null) {
            this.first_show_foot = 'none'
            this.first_show_foot_other = ''
          } else {
            var datenow = new Date()
            this.ztdy_all_page = parseInt(value_zt.result.length / 25)
            if (value_zt.result.length > this.ztdy_all_page * 25) {
              this.ztdy_all_page +=1
            }
            if (this.ztdy_all_page === 1) {
              this.ztdowndisabled = true
              this.ztupdisabled = true
            } else {
              this.ztdowndisabled = false
              this.ztupdisabled = true
            }
            for (var i = 0; i < this.ztdy_foot.length; i++) {
              var date_i = new Date(this.ztdy_foot[i].ExecTime)
              var date_week = new Date(datenow - 24 * 60 * 60 * 1000 * 7)
              if (date_i.toDateString() === datenow.toDateString()) {
                this.ztdy_today.push(this.ztdy_foot[i])
              } else if (Date.parse(date_i.toDateString()) < Date.parse(datenow.toDateString()) && Date.parse(date_i.toDateString()) > Date.parse(date_week.toDateString())) {
                this.ztdy_week.push(this.ztdy_foot[i])
              } else {
                this.ztdy_longer.push(this.ztdy_foot[i])
              }
            }
            this.first_show_foot = ''
            this.first_show_foot_other = 'none'
          }
          
        },
        //显示最新的词频内容
        show_word_new:async function(val){
          //此处val为当前点击行全部数据
          //后续可根据订阅ID来进行一个查询
          //未完待续...
          this.detail_get_id_fcdy = val.SubscriptionID
          var value_fc = await this.$SelectSub(val.SubscriptionID)
          this.fcdy_foot = value_fc.result
          console.log(this.fcdy_foot)
          if (this.fcdy_foot === null) {
            this.second_show_foot = 'none'
            this.second_show_foot_other = ''
          } else {
            this.$LoadEcharts('echartsposition', this.fcdy_foot[0].WordFrequency)
            this.second_show_foot = ''
            this.second_show_foot_other = 'none'
          }
        },
        //显示最新的url探测内容
        show_url_new:async function(val){
          //此处val为当前点击行全部数据
          //后续可根据订阅ID来进行一个查询
          //未完待续...
          this.dtdy_today = []
          this.dtdy_week = []
          this.dtdy_longer = []
          this.dtdy_foot_page_list_week = 0
          this.dtdy_foot_page_list_longer = 0
          this.dtdy_subject = val.Subject
          this.detail_get_id_dtdy = val.SubscriptionID
          var value_dt = await this.$SelectSub(val.SubscriptionID)
          console.log(value_dt)
          this.dtdy_foot = value_dt.result
          if (value_dt.result === null) {
            this.third_show_foot = 'none'
            this.third_show_foot_other = ''
          } else {
            var datenow = new Date()
            this.dtdy_foot_page = 1
            this.dtdy_all_page = parseInt(value_dt.result.length / 25)
            if (value_dt.result.length > this.dtdy_all_page * 25) {
              this.dtdy_all_page +=1
            }
            if (this.dtdy_all_page === 1) {
              this.dtdowndisabled = true
              this.dtupdisabled = true
            } else {
              this.dtdowndisabled = false
              this.dtupdisabled = true
            }
            for (var i = 0; i < this.dtdy_foot.length; i++) {
              var date_i = new Date(this.dtdy_foot[i].ExecTime)
              var date_week = new Date(datenow - 24 * 60 * 60 * 1000 * 7)
              if (date_i.toDateString() === datenow.toDateString()) {
                this.dtdy_today.push(this.dtdy_foot[i])
              } else if (Date.parse(date_i.toDateString()) < Date.parse(datenow.toDateString()) && Date.parse(date_i.toDateString()) > Date.parse(date_week.toDateString())) {
                this.dtdy_week.push(this.dtdy_foot[i])
              } else {
                this.dtdy_longer.push(this.dtdy_foot[i])
              }
            }
          }
        },
        openthmeadd:function(type){
          if (type=='theme') {
            this.dialogFormThemeSubVisible=true;
            //this.dialogFormThemeSubVisibletest=true;
            //console.log(this.dialogFormThemeSubVisibletest)
          } else if (type=='word'){
            this.dialogFormWordSubVisible = true;
          }else if (type=='url') {
            this.dialogFormUrlSubVisible = true;
          } else if (type == 'themeedit'){
            this.dialogFormThemeSubEVisible = true;
          } else if (type == 'wordedit') {
            this.dialogFormWordSubEVisible = true;
          }else if (type == 'urledit') {
            this.dialogFormUrlSubEVisible = true;
          }
        },
        closeall:function(){
          this.dialogFormThemeSubVisible = false;
          this.dialogFormThemeSubEVisible = false;
          this.dialogFormWordSubVisible = false;
          this.dialogFormWordSubEVisible = false;
          this.dialogFormUrlSubVisible = false;
          this.dialogFormUrlSubEVisible = false;
        },
        //删除指定的一行
        delete_row:function(type, val){
          //var DeleteRow = require('DeleteRow');
          this.$DeleteRow(type, val)
        },
        //打开指定的一行的修改框
        edit_row:function(type, val){
          //var EditRowOpen = require('EditRowOpen');
          
          this.$EditRowOpen(type, val)
        },
        //具体的提交修改
        edit_row_Push:function(type){
          //var PushEdit = require('PushEdit');
          this.$PushEdit(type)
        },
        //添加邮箱时检验邮箱格式
        check_email:function(type,value){
          this.$CheckEmail(type,value)
          
        },
        //发送请求实现更新结果集
        refresh_news:function(type){
          this.$Refreshdt(type)
        },
        more_result:function(type){
          this.$GetDetail(type)
        },
        test_func:function(){
          console.log('test yes');
        },
        havareadrow_ztdy:function(val){
          this.$HaveReadThis(val,'ztdy')
          console.log(val)
        },
        havareadrow_dtdy:function(val){
          console.log(val)
          this.$HaveReadThis(val,'dtdy')
        },
        SelectAll:function(){
          var selectitem = []
          for(var i=0;i<this.ztdy_foot.length;i++){
            var con = document.getElementById(String(this.ztdy_foot[i].Id))
            if (con) {
              if (con.checked == false) {
                var if_false = 1
                break
            }
            }
          }
          if (if_false == 1){
            selectitem = this.ztdy_foot
            for(var i=0;i<this.ztdy_foot.length;i++){
              var con = document.getElementById(String(this.ztdy_foot[i].Id))
              if (con) {
                con.checked = true
              }
            }
          } else {
            selectitem = []
            for(var i=0;i<this.ztdy_foot.length;i++){
              var con = document.getElementById(String(this.ztdy_foot[i].Id))
              if (con) {
                con.checked = false
              }
            }
          }
        },
        SelectAlldt:function() {
          var selectitem = []
          for(var i=0;i<this.dtdy_foot.length;i++){
            var con = document.getElementById('dtdy'+String(this.dtdy_foot[i].Id))
            if (con) {
              if (con.checked == false) {
                var if_false = 1
                break
            }
            }
          }
          if (if_false == 1){
            selectitem = this.dtdy_foot
            for(var i=0;i<this.dtdy_foot.length;i++){
              var con = document.getElementById('dtdy'+String(this.dtdy_foot[i].Id))
              if (con) {
                con.checked = true
              }
            }
          } else {
            selectitem = []
            for(var i=0;i<this.dtdy_foot.length;i++){
              var con = document.getElementById('dtdy'+String(this.dtdy_foot[i].Id))
              if (con) {
                con.checked = false
              }
            }
          }
        },
        pagedownzt:function(){
          this.ztdy_foot_page_list_week = 25*this.ztdy_foot_page-this.ztdy_today.length
          this.ztdy_foot_page_list_longer = 25*this.ztdy_foot_page-this.ztdy_today.length - this.ztdy_week.length
          if (this.ztdy_foot_page_list_week < 0) {
            this.ztdy_foot_page_list_week = 0
          }
          if (this.ztdy_foot_page_list_longer < 0) {
            this.ztdy_foot_page_list_longer = 0
          }
          if (this.ztdy_foot_page < this.ztdy_all_page) {
            this.ztdy_foot_page += 1
            if (this.ztdy_foot_page < this.ztdy_all_page) {
              this.ztdowndisabled = false
            } else {
              //按钮变灰色
              this.ztdowndisabled = true
            }
          }
          if (this.ztdy_foot_page > 1) {
            this.ztupdisabled = false
          } 
        },
        pageupzt:function(){
          this.ztdy_foot_page_list_week -= 25
          this.ztdy_foot_page_list_longer -= 25
          if (this.ztdy_foot_page_list_week < 0) {
            this.ztdy_foot_page_list_week = 0
          }
          if (this.ztdy_foot_page_list_longer < 0) {
            this.ztdy_foot_page_list_longer = 0
          }
          if (this.ztdy_foot_page > 1) {
            this.ztdy_foot_page -= 1
            if (this.ztdy_foot_page > 1) {
              this.ztupdisabled = false
            } else {
            // 按钮变灰色
            this.ztupdisabled = true
          }
          } 
          if (this.ztdy_foot_page < this.ztdy_all_page) {
            this.ztdowndisabled = false
          } 
        },
        pagedowndt:function(){
          this.dtdy_foot_page_list_week = 25*this.dtdy_foot_page-this.dtdy_today.length
          this.dtdy_foot_page_list_longer = 25*this.dtdy_foot_page-this.dtdy_today.length - this.dtdy_week.length
          if (this.dtdy_foot_page_list_week < 0) {
            this.dtdy_foot_page_list_week = 0
          }
          if (this.dtdy_foot_page_list_longer < 0) {
            this.dtdy_foot_page_list_longer = 0
          }
          if (this.dtdy_foot_page < this.dtdy_all_page) {
            this.dtdy_foot_page += 1
            if (this.dtdy_foot_page < this.dtdy_all_page) {
              this.dtdowndisabled = false
            } else {
              //按钮变灰色
              this.dtdowndisabled = true
            }
          }
          if (this.dtdy_foot_page > 1) {
            this.dtupdisabled = false
          } 
        },
        pageupdt:function(){
          this.dtdy_foot_page_list_week -= 25
          this.dtdy_foot_page_list_longer -= 25
          if (this.dtdy_foot_page_list_week < 0) {
            this.dtdy_foot_page_list_week = 0
          }
          if (this.dtdy_foot_page_list_longer < 0) {
            this.dtdy_foot_page_list_longer = 0
          }
          if (this.dtdy_foot_page > 1) {
            this.dtdy_foot_page -= 1
            if (this.dtdy_foot_page > 1) {
              this.dtupdisabled = false
            } else {
            // 按钮变灰色
            this.dtupdisabled = true
          }
          } 
          if (this.dtdy_foot_page < this.dtdy_all_page) {
            this.dtdowndisabled = false
          } 
        },
       
         
        check:function(){
          var rows = document.getElementById("zt_table").rows;
          var a = document.getElementsByName("zt");
          //var states = "";
          var  table = document.getElementById("zt_table");
          for(var i=0;i<a.length;i++)
          {
          if(a[i].checked){
          // var row = a[i].parentElement.parentElement.rowIndex;
          // console.log("row",row)
          // console.log("ss",rows[row].cells[1].getElementsByTagName("a"));
          // rows[row].cells[1].getElementsByTagName("a")[0].style["font-weight"]="normal";
          var axios = require('axios')
          // var id = rows[row].cells[1].id;
          // alert(id)
          // var type=rows[row].cells[1].document.getElementById(String(this.sub_type))
          // var data = {
          //   'ids':  this.checkVals,
          //   'sub_type': 'ztdy'
          // }
          console.log(data);
          var me = this
          var conf = {
            method: 'post',
            // url: 'http://175.24.28.202:8000/api/v1/results',
            // url: 'http://175.24.28.202:80/api/v1/someresult',
            url:'http://175.24.28.202:80/api/v1/someresult',
            headers: {
              'jwtToken': localStorage.getItem('token'),
              'Content-Type': 'application/json;charset=UTF-8'
              // 'Host': 'http://175.24.28.202:80'
            },
            data: JSON.stringify(this.checkVals)
            // data:data
           
         
          }
          console.log(data);
          axios(conf)
            .then(function (response) {
              // alert("哈哈");
              if(response.status=1){
                alert("修改成功")
                 me.$message({
                        message: '标注成功',
                        type: 'success'
                        });
                
              }
              
            })
            .catch(function (error) {
              console.log(error)
            })
         
          }
          }
        },
        checkboxHandle(e, value,ids) {
          // ids=unique(id)
          // console.log(e, value,ids)
          if (e.target.checked) {
            this.checkVals.push({
                ids
                // sub_type: value.split('_')[1]
                // sub_type:"ztdy"
                
            })
          }
        // console.log(this.checkVals)
        }
      }
    }
</script>
<style>
  .drop-down-i{
      margin-top:17px;
      margin-right:100px;
      float:right;
    }
  
    
  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
      
    }
  .el-icon-arrow-down {
      font-size: 12px;
    }

  .el-header {
        background-color: rgb(138, 184, 243);
        color: blue;
        height:40px;
        width:100%;
        
        }
  .el-footer-me {
          background-color: rgb(255, 255, 255);
          color: #333;
          line-height: 0px;
          min-height:40px;
          width:100%;
          text-align:center;
    }
  
  .foot_for_text {
    width:100%;
    text-align:center;
    background-color: rgb(255, 255, 255);
    
  }

  .el-main {
      background-color: #E9EEF3;
      color: #333;
      line-height: 120%;
      width:100%;
    }
  .dt_foot_left {
    background-color: rgb(255, 255, 255);
    width: 50%;
    float: left;
  }
  .dt_foot_right {
    background-color: rgb(255, 255, 255);
    width: 50%;
    float: right;
  }
  .ztdy_foot_show {
    width:100%;
    text-align:center;
    margin:auto auto;
    background-color: rgb(255, 255, 255);
  }
  a:link,a:visited{
 text-decoration:none;  /*超链接无下划线*/
}
</style>